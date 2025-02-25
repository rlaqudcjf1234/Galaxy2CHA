import axios from "axios";
import { setAccessToken } from "../redux/tokenSlice"
import { store } from "../redux/store"

let retryCallbacks = [];//실패한 요청을 재시도하기 위한 콜백함수 배열
let isLocked = false;//갱신 요청을 한 번만 보내기 위한 락

const reissueTokenAndRetry = async (instance, err) => {
    try {
        const { response } = err;

        // 콜백함수를 만들어 배열에 집어넣는다. 새로 액세스 토큰을 받아오면 헤더에 넣어, 실패했던 요청들을 재시도할 것이다. 
        const retry = new Promise((resolve, reject) => {
            retryCallbacks.push((accessToken) => {
                try {
                    // 액세스 토큰을 헤더에 넣고
                    response.headers.authorization = accessToken;
                    // 재시도해본다.
                    resolve(instance(response.config));
                } catch (err) {
                    reject(err);
                }
            });
        });

        // 락이 걸려있지 않은 경우 
        if (!isLocked) {
            //락을 걸고
            isLocked = true;
            //갱신 요청을 보낸다
            await instance.get("/api/refresh")
                .then((res) => {
                    //요청에 성공해 토큰을 받아왔다면
                    const reissuedToken = res.headers.authorization;
                    //저장하고
                    store.dispatch(setAccessToken(reissuedToken));
                    //이를 가지고 저장해놓은 콜백함수들을 모두 실행한다
                    retryCallbacks.forEach((callback) => callback(reissuedToken));
                })
                .finally(() => {
                    //갱신에 성공했다면 콜백함수들이 모두 실행됐을 것이므로 비워주고
                    //실패했다면 갱신이 불가능하므로 비워준다. 
                    retryCallbacks = [];
                    //락도 풀어준다.
                    isLocked = false
                })
        }
        return retry;
    }
    catch (err) {
        return Promise.reject(err);
    }
}

const createAxiosInstance = (needAuthentication) => {
    const instance = axios.create({
        withCredentials: true,
        baseURL: import.meta.env.VITE_BASE_URL,
        timeout: 10000,
    })

    instance.interceptors.request.use((req) => {
        // 인증이 필요한 요청인 경우 
        if (needAuthentication) {
            //redux 스토어에서 액세스 토큰의 값을 가져오자
            const accessToken = store.getState().accessToken.val;
            //요청 헤더에 담아주고 
            req.headers.Authorization = accessToken;
        }
        // 그대로 진행하자
        return req;
    });

    instance.interceptors.response.use(
        // 성공한 경우
        (res) => {
            return res;
        },
        // 실패한 경우 
        async (err) => {
            const { config, response } = err;
            // 갱신 요청인데 실패한 경우, 인증 실패로 실패한 게 아닌 경우(401이 아닌 경우), 인증이 필요한 요청을 보내는 axios 인스턴스가 아닌 경우는 그대로 실패로 처리
            if (config.url === "/api/refresh" || response.status !== 401 || !needAuthentication) {
                store.dispatch(setAccessToken(""));
                return Promise.reject(err);
            }

            // 갱신을 시도해보아야 하는 경우
            return await reissueTokenAndRetry(instance, err);
        }
    )

    return instance;
}

export const request = createAxiosInstance(false)
export const authenticatedRequest = createAxiosInstance(true)