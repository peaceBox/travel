<script>
export default {
  components: {
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    let liffId;
    if(process.env.NODE_ENV === 'development'){
      liffId = "1654260093-WXM6NYjg";
    } else {
      liffId = "1654260093-48kyoZaA";
    }
    if (!liff.id) {
      liff
        .init({
          liffId: liffId
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            const path = localStorage.getItem('path', this.$route.query.path);
            if(path) {
              this.$router.push(path)
            } else {

            }
          } else {
            localStorage.setItem('path', this.$route.query.path);
            liff.login();
          }
        })
        .catch((err) => {
        // Error happens during initialization
          console.log(err.code, err.message);
          alert('エラーが発生しました');
          this.$store.commit('updateLoading', false);
        });
    }
  }
};
</script>
