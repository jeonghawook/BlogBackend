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


## **주요기술**
<table>
  <tr>
  <td>CI/CD</td>
  <td>채팅</td>
 
 </tr>
 <tr>
  <td>소셜로그인</td>
  <td>HTTPS</td>
 
 </tr>

</table>

## **아키택처**
<img src="https://github.com/jeonghawook/CommunityBackend/assets/126029736/7593b462-b655-4884-8176-eb98ab1cf1c4">

## **기술 스텍**
<table>
 <tr>
    <td><strong>HTTPS</strong></td>
    <td> - SSL/TSL 발급을 통하여 도메인에 보안성 강화 <br />
   </td>
  </tr>
  <tr>
    <td><strong>Postgres</strong></td>
    <td> - 대부분 정형화된 데이터여서 SQL로 선정<br />
- 추후 Postgres에서 사용할 다양한 plugin과 기능을 고려해서 선정</td>
  </tr>
  <tr>
    <td><strong>Redis</strong></td>
    <td>- JWT RefreshToken의 관리의 편의성<br />
- 추후 자주 사용되는 부분을 캐싱하거나 db에 자주 조회되서 cost가 많이 발생하는 부분을 redis로 해결</td>
  </tr>
  <tr>
    <td><strong>S3</strong></td>
    <td>- 사진 업로드</td>
  </tr>
   <tr>
    <td><strong>Socket.io</strong></td>
    <td>- 실시간 채팅을 위해서 선정<br />
- 추후 pub-sub 아키텍쳐와 알림 기능에도 사용될 예정 </td>
  </tr>
   <tr>
    <td><strong>CI/CD</strong></td>
    <td>- 개발 환경과 운영 환경 사이의 차이를 최소화 해주는 DOCKER CD로 선정<br />
- Githbub Action/ 다른 CI 보다 러닝커브가 낮고 편리하게 관리가능</td>
  </tr>
  <tr>
    <td><strong>Bcrypt</strong></td>
    <td>- 다양한 보안중 brute force에 대응하기 위해 선정<br />
 </td>
  </tr>
</table>

## **트러블슈팅** 
[카카오 로그인 트러블 ! ](https://velog.io/@saro3/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B3%BC%EC%A0%95)
[DOCKER permission ERROR ! ](https://velog.io/@saro3/Docker-GithubAction)

<br>

## **FE에서 화면 보기**
 [FRONTEND GIT으로 바로가기 ! ](https://github.com/jeonghawook/CommunityFrontend)
