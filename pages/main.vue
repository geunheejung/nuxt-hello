<template>
  <div>
    <h1>메인 페이지</h1>
    {{ producets }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData() {
    // 서버 사이드 렌더링 -> vue 라이프 사이클 이용한 메서드 호출 지향
    const response = await axios.get('http://localhost:3000/products');

    const { data } = response;

    // asyncData는 서버에서 Vue 인스턴스를 렌더링 하는 시점에 호출 된다.
    // 시점이 서버 시점 이므로, 현재 시점에는 아직 현재 인스턴스의 state가 초기화 되지 않았다.
    // this.producets = data;

    return {
      data
    }
  },
  data() { return {
    producets: [],
  }},
  async created() {
    console.log(this.data);
    // // 서버 사이드 렌더링 -> vue 라이프 사이클 이용한 메서드 호출 지향
    // const response = await axios.get('http://localhost:3000/products');
    //
    // const { data } = response;
    //
    // this.producets = data;
  }
}
</script>

<style></style>
