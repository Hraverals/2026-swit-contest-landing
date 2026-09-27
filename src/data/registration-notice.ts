export type RegistrationNoticeCopy = {
    readonly title: string;
    readonly paragraphs: readonly string[];
};

export type RegistrationNotice = RegistrationNoticeCopy & {
    readonly enabled: boolean;
};

/**
 * 참가 접수 상태의 단일 제어점.
 *
 * closed 한 값이 세 가지를 동시에 뒤집는다 — 팝업 문구, 히어로 CTA, '참가 신청'
 * 섹션 CTA. 버튼을 따로 관리하면 팝업은 마감인데 버튼은 구글폼으로 열려 있는
 * 어긋난 상태가 생긴다.
 *
 * noticeEnabled 는 closed 와 다른 축이다. "접수가 끝났는가" 와 "팝업을 띄우는가"
 * 는 별개이며, 마감 상태에서 팝업만 내리고 싶을 때 이 값만 false 로 둔다.
 * 이 둘을 한 필드로 합치면 팝업을 끄려는 조작이 버튼을 다시 열어 버린다.
 */
export const REGISTRATION = {
    /** 접수 마감 여부. 버튼과 팝업 문구가 함께 따라간다. */
    closed: true,
    /** 팝업 표시 여부. false 면 dialog 마크업 자체가 빠진다. */
    noticeEnabled: true,
} as const;

/**
 * 마감 이전 문구.
 *
 * 되살릴 일이 생기면 문구부터 다시 써야 한다. 이건 "접수 중" 이 아니라
 * "충남대 인원만 마감된 시점" 의 안내라 지금 그대로 쓰면 사실과 다르다.
 */
const NOTICE_OPEN: RegistrationNoticeCopy = {
    title: "참가 접수 및 지원 안내",
    paragraphs: [
        "전체 COSS 컨소시엄 소속 대학 재학생이 참가할 수 있습니다. 참여 학생의 경비·여비 지원을 위해 각 소속 대학에 공문을 발송할 예정입니다.",
        "장소 수용 인원 제한으로 충남대학교 학생의 참가 접수가 마감되었습니다.",
        "운영진은 정원 확대를 위해 노력하고 있으며, 추가 모집이 시작되면 신속히 신청해 주시면 감사하겠습니다.",
    ],
};

/** 전체 마감 문구. */
const NOTICE_CLOSED: RegistrationNoticeCopy = {
    title: "참가 접수 마감",
    paragraphs: [
        "2026 SW-IT Contest 참가 접수가 마감되었습니다. 관심 가져주신 모든 분께 감사드립니다.",
        "대회는 10월 5일(월), 충남대학교 제3학생회관 (N-7) 1층 영탑홀에서 진행됩니다.",
    ],
};

export const REGISTRATION_NOTICE = {
    enabled: REGISTRATION.noticeEnabled,
    ...(REGISTRATION.closed ? NOTICE_CLOSED : NOTICE_OPEN),
} as const satisfies RegistrationNotice;

/**
 * 참가 신청 구글폼.
 *
 * 마감 상태에서는 이 주소를 렌더하지 않는다. href 만 비우면 마크업에 주소가
 * 남아 개발자 도구나 소스 보기로 접근할 수 있으므로, 링크 요소 자체를 바꾼다.
 */
export const APPLY_FORM_URL = "https://forms.gle/uPfh6FU3BDJEsYd8A";

/** 두 CTA 버튼의 문구. 마감 여부로 갈린다. */
export const APPLY_CTA_LABEL = {
    hero: REGISTRATION.closed ? "참가 마감" : "참가 신청",
    apply: REGISTRATION.closed ? "참가 마감" : "구글폼으로 신청하기",
} as const;
