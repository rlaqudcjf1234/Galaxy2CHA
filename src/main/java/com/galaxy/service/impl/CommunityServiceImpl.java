package com.galaxy.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.galaxy.dto.CommListDto;
import com.galaxy.dto.CommPostDto;
import com.galaxy.dto.CommSearchDto;
import com.galaxy.mapper.CommunityMapper;
import com.galaxy.service.CommunityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommunityServiceImpl implements CommunityService {
    // 생성자 주입을 위한 final 필드
    private final CommunityMapper communityMapper;

    @Override
    public CommListDto selectList(CommSearchDto searchDto) throws Exception {
        // 페이징 및 테이블 타입 기본값 설정
        searchDto.setPageIndex(Math.max(searchDto.getPageIndex(), 1));
        searchDto.setPageSize(Math.max(searchDto.getPageSize(), 10));

        if (searchDto.getTableType() == null) {
            searchDto.setTableType("STUDENT");
        }
        if (searchDto.getClassSeq() != null) {
            log.info("특정 클래스 조회: classSeq={}", searchDto.getClassSeq());
        }

        // 로그 추가
        log.info("검색 조건: tableType={}, pageIndex={}, pageSize={}, searchKeyword={}",
                searchDto.getTableType(),
                searchDto.getPageIndex(),
                searchDto.getPageSize(),
                searchDto.getSearchKeyword());

        // 전체 게시글 수 조회
        int totalCount = communityMapper.selectCommunityCount(searchDto);

        // 게시글 목록 조회
        List<Map<String, Object>> rawList = communityMapper.selectCommunityList(searchDto);

        // 로그 추가
        log.info("조회된 게시글 수: {}", rawList.size());

        // 게시글 목록 매핑
        List<CommListDto.CommItem> items = rawList.stream()
                .map(this::mapToCommItem)
                .collect(Collectors.toList());

        return new CommListDto(totalCount, items);
    }

    @Override
    @Transactional
    public void addPost(CommPostDto postDto) throws Exception {
        // 입력값 검증
        validatePostData(postDto);

        // 현재 시간 설정
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Mapper에 전달할 데이터 준비
        Map<String, Object> params = new HashMap<>();

        // 필수 필드 설정
        params.put("studentSeq", postDto.getStudentSeq());  // authorSeq 대신 studentSeq 사용
        params.put("title", postDto.getTitle());
        params.put("division", postDto.getDivision());
        params.put("detail", postDto.getDetail());
        params.put("regDt", formattedDate);

        // tableType 설정 - 제공된 값 사용 또는 기본값 STUDENT
        String tableType = postDto.getTableType() != null ? postDto.getTableType() : "STUDENT";
        params.put("tableType", tableType);

        // 선택적 필드 설정 - null이 아닌 경우에만 추가
        if (postDto.getClassSeq() != null) {
            params.put("classSeq", postDto.getClassSeq());
        }

        // 로그 추가
        log.info("게시글 등록 파라미터: {}", params);

        // 데이터베이스에 저장
        communityMapper.insertCommunityPost(params);
    }

    @Override
    public CommListDto.CommItem selectPost(Long seq, String tableType) throws Exception {
        if (seq == null) {
            throw new IllegalArgumentException("게시글 번호는 필수 입력 항목입니다.");
        }

        // CLASS 테이블에서 조회
        Map<String, Object> classParams = new HashMap<>();
        classParams.put("tableType", "CLASS");
        classParams.put("seq", seq);
        Map<String, Object> classResult = communityMapper.selectCommunityPost(classParams);

        // STUDENT 테이블에서 조회
        Map<String, Object> studentParams = new HashMap<>();
        studentParams.put("tableType", "STUDENT");
        studentParams.put("seq", seq);
        Map<String, Object> studentResult = communityMapper.selectCommunityPost(studentParams);

        // 결과가 있는 테이블의 데이터 사용
        Map<String, Object> map = null;
        if (classResult != null && !classResult.isEmpty()) {
            map = classResult;
        } else if (studentResult != null && !studentResult.isEmpty()) {
            map = studentResult;
        } else {
            return null; // 모든 테이블에서 결과가 없는 경우
        }

        // 데이터 매핑
        return mapToCommItem(map);
    }

    // 입력값 검증 메서드
    private void validatePostData(CommPostDto postDto) {
        if (postDto.getTitle() == null || postDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("제목은 필수 입력 항목입니다.");
        }
        if (postDto.getStudentSeq() == null) {
            throw new IllegalArgumentException("작성자 정보는 필수 입력 항목입니다.");
        }
    }

    // 맵 데이터를 CommItem으로 변환하는 내부 메서드
    private CommListDto.CommItem mapToCommItem(Map<String, Object> map) {
        if (map == null) {
            return null;
        }

        CommListDto.CommItem item = new CommListDto.CommItem();

        // 안전하게 값 설정
        try {
            // SEQ
            Object seqObj = map.get("SEQ");
            if (seqObj != null) {
                if (seqObj instanceof Number) {
                    item.setSeq(((Number) seqObj).longValue());
                } else if (seqObj instanceof String) {
                    item.setSeq(Long.parseLong((String) seqObj));
                }
            }

            // AUTHOR_SEQ
            Object authorSeqObj = map.get("AUTHOR_SEQ");
            if (authorSeqObj != null) {
                if (authorSeqObj instanceof Number) {
                    item.setAuthorSeq(((Number) authorSeqObj).longValue());
                } else if (authorSeqObj instanceof String) {
                    item.setAuthorSeq(Long.parseLong((String) authorSeqObj));
                }
            }

            // RNUM (조심스럽게 처리)
            Object rnumObj = map.get("RNUM");
            if (rnumObj != null) {
                if (rnumObj instanceof Number) {
                    item.setRnum(((Number) rnumObj).intValue());
                } else if (rnumObj instanceof String) {
                    item.setRnum(Integer.parseInt((String) rnumObj));
                }
            } else {
                // RNUM이 없으면 기본값 0 설정
                item.setRnum(0);
            }

            // 문자열 값들
            item.setAuthor(getStringValueOrEmpty(map, "AUTHOR_NAME"));
            item.setTitle(getStringValueOrEmpty(map, "TITLE"));
            item.setDivision(getStringValueOrEmpty(map, "DIVISION"));
            item.setDetail(getStringValueOrEmpty(map, "DETAIL"));
            item.setRegDt(getStringValueOrEmpty(map, "REG_DT"));

        } catch (Exception e) {
            // 예외 로깅
            System.err.println("데이터 매핑 오류: " + e.getMessage());
            e.printStackTrace();
        }

        return item;
    }

    // 안전하게 문자열 값 반환
    private String getStringValueOrEmpty(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value != null ? value.toString() : "";
    }

    @Override
    public boolean updatePost(CommListDto.CommItem postItem, String communityType) throws Exception {
        // 입력값 검증
        if (postItem.getTitle() == null || postItem.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("제목은 필수 입력 항목입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("seq", postItem.getSeq());
        params.put("title", postItem.getTitle());
        params.put("division", postItem.getDivision());
        params.put("detail", postItem.getDetail());
        params.put("tableType", communityType.toUpperCase());

        int updatedCount = communityMapper.updatePost(params);
        return updatedCount > 0;
    }

    @Override
    public boolean deletePost(Long seq, String communityType) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("seq", seq);
        params.put("tableType", communityType.toUpperCase());

        int deletedCount = communityMapper.deletePost(params);
        return deletedCount > 0;
    }
}