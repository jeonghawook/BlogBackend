# **카카오 커뮤니 프로젝트** 
</br>
<strong> 소개: 카카오 스토리를 연동한 페이스북/Thread/트위치 같은 커뮤니티 </strong>
</br>
<br>
<details>
<summary>ERD</summary>
<br>
<img src="https://github.com/jeonghawook/CommunityBackend/assets/126029736/eba8d292-9014-4583-93d3-7d095521d516">
</details>

<details>
<summary>주요기술</summary>
<br>
<img src="">
</details>

## **아키택처**
<img src="https://github.com/jeonghawook/CommunityBackend/assets/126029736/7593b462-b655-4884-8176-eb98ab1cf1c4">

## **기술 스텍**
<table>
 <tr>
    <td><strong>HTTPS</strong></td>
    <td> - SSL/TSL 발급을 통하여 도메인에 대한 보안성과 검색 노출 빈도를 증가<br />
- FE에서 vercel사용을 위하여 구축</td>
  </tr>
  <tr>
    <td><strong>MySQL</strong></td>
    <td> - 대부분 정형화된 데이터여서 SQL로 선정<br />
- MySQL로 프로젝트의 모든 기능이 가능하다 판단하여 팀원 모두 숙련도가 높은 DB로 선정</td>
  </tr>
  <tr>
    <td><strong>Redis</strong></td>
    <td>- 이메일 인증코드, Refresh Token, Device Token의 만료시간 관리의 편의성<br />
- Device Token의 경우 Update가 많지 않을거라 판단하여 Global Cache를 통해 성능향상을 위해 선정</td>
  </tr>
  <tr>
    <td><strong>S3</strong></td>
    <td>CI/CD 파이프라인 구축과 사진 업로드를 위해 선정</td>
  </tr>
</table>

## **트러블슈팅** 
<details>
<summary>주요기술</summary>
<br>
<img src="">
</details>
<details>
<summary>주요기술</summary>
<br>
<img src="">
</details>

### **FE에서 화면 보기**
 [FRONTEND GIT으로 바로가기 ! ](https://github.com/jeonghawook/CommunityFrontend)
