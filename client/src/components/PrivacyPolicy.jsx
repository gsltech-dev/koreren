// client/src/components/policy/PrivacyPolicy.jsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-6 py-10 md:py-14">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          개인정보 처리방침
        </h1>
      </header>

      <section className="prose prose-neutral max-w-none [&_*]:leading-relaxed">
        <p className="font-semibold mb-5">KOREREN 개인정보처리방침</p>

        <p className="mb-5">
          주식회사 <strong>GSLTECH</strong>(이하 “회사”)는 개인정보 보호법 등
          관련 법령을 준수하며, 이용자의 개인정보를 중요하게 생각합니다.
          <br></br>회사는 브랜드 홈페이지(<strong>KOREREN</strong>)를 운영함에
          있어 개인정보 처리방침을 통해, 수집되는 개인정보의 항목과 이용 목적,
          보유 기간, 안전성 확보조치 등을 안내합니다.
        </p>

        <p className="mb-5">
          회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한
          용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가
          취해지고 있는지 공개하고 있습니다. 또한, 개인정보처리방침을 개정하는
          경우 웹사이트를 통하여 공지하고 있습니다.
        </p>

        <ol className="pl-5 space-y-1">
          <li>1. 개인정보의 처리 목적 및 항목</li>
          <li>2. 개인정보의 처리 및 보유 기간</li>
          <li>3. 개인정보의 제3자 제공에 관한 사항</li>
          <li>4. 개인정보처리의 위탁에 관한 사항</li>
          <li>5. 정보주체의 권리·의무 및 그 행사방법에 관한 사항</li>
          <li>6. 개인정보의 파기절차 및 방법</li>
          <li>7. 개인정보 보호책임자에 관한 사항</li>
          <li>8. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</li>
          <li>9. 개인정보의 안정성 확보조치에 관한 사항</li>
          <li>10. 개인정보 처리방침의 변경에 관한 사항</li>
        </ol>

        {/* 1. 목적/항목 */}
        <h2 className="mt-10 mb-5 font-semibold">
          1. 개인정보의 처리 목적 및 항목
        </h2>

        <p className="mb-5">
          (1) 회사는 이용자의 개인정보를 다음의 목적을 위해 처리 및 수집합니다.
          <br />※ <strong>koreren.co.kr</strong>
        </p>

        <div className="overflow-x-auto text-left mb-5">
          <table className="w-full table-fixed border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3 text-xs">
                  수집·이용목적
                </th>
                <th className="border border-gray-300 p-3 text-xs">
                  자세한 내용
                </th>
                <th className="border border-gray-300 p-3 text-xs">수집항목</th>
                <th className="border border-gray-300 p-3 text-xs">
                  보유 기간
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  문의 접수
                </td>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  “1:1문의”에 대한 처리 및 결과 회신
                </td>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  이름, 연락처, 이메일
                </td>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  1년
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-5">
          (2) 서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될
          수 있습니다.
          <br />① IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록
        </p>

        <p>
          (3) 개인정보의 수집 방법
          <br />
          ① 홈페이지 및 어플, 전화, 이메일, 팩스, 우편을 통한 수집
          <br />② 홈페이지 및 어플 이용 시 개인정보 자동수집 장치를 통한 수집
        </p>

        {/* 2. 보유기간 */}
        <h2 className="mt-10 mb-5 font-semibold">
          2. 개인정보의 처리 및 보유 기간
        </h2>

        <p className="mb-5">
          원칙적으로, 이용자의 개인정보는 개인정보의 수집 및 이용목적이 달성한
          후에는 지체 없이 파기합니다. 단, 관계법령 등의 규정에 의하여 보존할
          필요가 있는 경우 회사는 아래의 이유로 명시한 기간 동안 회원 정보를
          보관합니다.
        </p>

        <p className="mb-5">
          (1) 회사 내부방침에 의한 정보 보유 사유
          <br />※ <strong>koreren.co.kr</strong>
        </p>

        <div className="overflow-x-auto mb-5">
          <table className="w-full table-fixed border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3 text-xs">보유정보</th>
                <th className="border border-gray-300 p-3 text-xs">보유기간</th>
                <th className="border border-gray-300 p-3 text-xs">보유목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  부정이용기록 및 문의 내용에 대한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  1년
                </td>
                <td className="border border-gray-300 p-3 align-top text-xs">
                  부정 이용 방지 및 문의 내용에 대한 기록 보존
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-5">(2) 관련법령에 의한 정보 보유 사유</p>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border border-gray-300 text-left text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3">보유정보</th>
                <th className="border border-gray-300 p-3">보유기간</th>
                <th className="border border-gray-300 p-3">근거법령</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  웹사이트 또는 어플 방문 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">3개월</td>
                <td className="border border-gray-300 p-3 align-top">
                  통신비밀보호법
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  본인확인에 관한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">6개월</td>
                <td className="border border-gray-300 p-3 align-top">
                  정보통신망 이용촉진 및 정보보호 등에 관한 법률
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  계약 또는 청약철회 등에 관한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">5년</td>
                <td className="border border-gray-300 p-3 align-top"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  대금결제 및 재화 등의 공급에 관한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">5년</td>
                <td className="border border-gray-300 p-3 align-top"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  소비자의 불만 또는 분쟁처리에 관한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">3년</td>
                <td className="border border-gray-300 p-3 align-top"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 align-top">
                  표시 광고에 관한 기록
                </td>
                <td className="border border-gray-300 p-3 align-top">6개월</td>
                <td className="border border-gray-300 p-3 align-top"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. 제3자 제공 */}
        <h2 className="mt-10 font-semibold">
          3. 개인정보의 제3자 제공에 관한 사항
        </h2>
        <p>
          <p className="mb-5">
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다.
          </p>
          <p>
            ① 이용자들이 사전에 동의한 경우<br></br>② 법령의 규정에 의거하거나,
            수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가
            있는 경우
          </p>
        </p>

        {/* 4. 위탁 */}
        <h2 className="mt-10 font-semibold">
          4. 개인정보처리의 위탁에 관한 사항
        </h2>
        <p>회사는 이용자의 개인정보를 외부 업체에 위탁하지 않습니다.</p>

        {/* 5. 권리/의무 */}
        <h2 className="mt-10 mb-5 font-semibold">
          5. 정보주체의 권리·의무 및 그 행사방법에 관한 사항
        </h2>
        <p>
          (1) 이용자는 회사에 대해 이용자의 개인정보 열람·정정·삭제·처리정지
          혹은 동의 철회의 권리를 행사할 수 있습니다.
        </p>
        <p>
          (2) 제1항에 따른 권리 행사는 개인정보 보호책임자에게 서면, 이메일 등을
          통해 요청할 수 있으며, 회사는 지체 없이 조치합니다.
        </p>

        {/* 6. 파기 */}
        <h2 className="mt-10 mb-5 font-semibold">
          6. 개인정보의 파기절차 및 방법
        </h2>
        <p className="mb-5">
          (1) 파기절차
          <br />
          ① 이용자가 1:1문의 등을 통해 제공한 개인정보는 담당자 이메일로
          전송되며, 문의 처리 및 보관 기간(최대 1년) 동안에 이메일 저장됩니다.
          <br />② 보관 기간이 경과하거나 처리 목적이 달성된 경우, 담당자는 해당
          메일을 즉시 삭제합니다.
        </p>
        <p>
          (2) 파기방법
          <br />
          ① 전자적 형태의 개인정보(이메일 내용)는 복구할 수 없도록 영구
          삭제합니다.
          <br />② 출력물(필요 시 출력된 경우)은 분쇄하거나 소각하여 파기합니다.
        </p>

        {/* 7. 보호책임자 */}
        <h2 className="mt-10 mb-5 font-semibold">
          7. 개인정보 보호책임자에 관한 사항
        </h2>
        <p className="mb-3">
          (1) 회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을
          처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>

        <div className="overflow-x-auto mb-5">
          <table className="w-full table-fixed border border-gray-300 text-left text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3">구분</th>
                <th className="border border-gray-300 p-3">koreren.co.kr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">
                  개인정보 보호책임자
                </td>
                <td className="border border-gray-300 p-3">김유신</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">연락처</td>
                <td className="border border-gray-300 p-3">[작성중]</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">이메일</td>
                <td className="border border-gray-300 p-3">[작성중]</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">1:1 문의 담당자</td>
                <td className="border border-gray-300 p-3">장시온</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">연락처</td>
                <td className="border border-gray-300 p-3">[작성중]</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">이메일</td>
                <td className="border border-gray-300 p-3">jso@gsland.tech</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-5">
          (2) 이용자께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호
          관련 민원을 개인정보보호책임자 혹은 1:1문의 담당자에게 신고하실 수
          있습니다.
        </p>
        <p>
          (3) 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
          기관에 문의하시기 바랍니다.
          <br />– 개인정보 침해신고센터 (
          <a href="https://privacy.kisa.or.kr" target="_blank" rel="noreferrer">
            privacy.kisa.or.kr
          </a>
          /118)
          <br />– 개인정보 분쟁조정위원회 (
          <a href="https://www.kopico.go.kr" target="_blank" rel="noreferrer">
            www.kopico.go.kr
          </a>
          /1833-6972)
          <br />– 대검찰청 사이버수사과 (
          <a href="https://spo.go.kr" target="_blank" rel="noreferrer">
            spo.go.kr
          </a>
          /1301)
          <br />– 경찰청 사이버안전국 (
          <a
            href="https://cyberbureau.police.go.kr"
            target="_blank"
            rel="noreferrer"
          >
            cyberbureau.police.go.kr
          </a>
          /182)
        </p>

        {/* 8. 쿠키 등 */}
        <h2 className="mt-10 font-semibold">
          8. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
        </h2>
        <p>회사는 쿠키 등 개인정보 자동수집 장치를 이용하지 않습니다.</p>

        {/* 9. 안전성 조치 */}
        <h2 className="mt-10 font-semibold">
          9. 개인정보의 안정성 확보조치에 관한 사항
        </h2>
        <p className="mb-5">
          회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난,
          누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
          기술적/관리적 보호대책을 강구하고 있습니다.
        </p>
        <p className="mb-5">
          (1) 개인정보 취급자의 최소화 및 교육
          <br />
          회사는 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에 대한
          교육 등 관리적 조치를 통해 개인정보보호의 중요성을 인식시키고
          있습니다.
        </p>
        <p>
          (2) 계정 보안 관리
          <br />
          담당자의 이메일 계정에 대해 정기적으로 비밀번호를 변경하도록 하고,
          안전한 비밀번호 사용을 의무화하여 무단 접근을 예방합니다.
        </p>

        {/* 10. 변경 */}
        <h2 className="mt-10 mb-5 font-semibold">
          10. 개인정보 처리방침의 변경에 관한 사항
        </h2>
        <p className="mb-5">
          현 개인정보처리방침은 <strong>2025년 9월 10일</strong>부터 적용되며,
          법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이
          있을 시에는 변경사항 시행일의 7일 전부터 홈페이지를 통해 고지할
          것입니다.
        </p>
        <p>
          – 시행일자 : <strong>2025년 9월 10일</strong>
          <br />– 공고일자 : <strong>2025년 9월 10일</strong>
          <br />
          개인정보처리방침 <strong>ver 1.0</strong>
        </p>
      </section>
    </div>
  );
}
