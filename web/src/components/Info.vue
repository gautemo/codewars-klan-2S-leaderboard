<template>
    <footer>
        <p>
            If you want to contribute, 
            you can send pull requests to this 
            <a href="https://github.com/gautemo/codewars-klan-2S-leaderboard" target="_blank" rel="noopener">GitHub repository</a>
        </p>
        <p class="me">
            <span class="createdby">Created by: Gaute Meek Olsen</span>
            <Twitter />    
            <GitHub />
            <Portofolio size="20" />
        </p>
    </footer>
</template>

<script>

export default {
  components: {
    Twitter: () => import('./icons/Twitter'),
    GitHub: () => import('./icons/GitHub'),
    Portofolio: () => import('./icons/Portofolio')
  }
}
</script>

<style scoped>
footer{
    margin: 20px 50px;
}

.me{
    display: flex;
    align-items: center;
    height: 30px;
}
.createdby{
    margin-right: 5px;
}
</style>
