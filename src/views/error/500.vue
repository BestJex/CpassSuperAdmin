<template>
  <lh-error errorTitle="500" errorDec="抱歉，服务器出错了" />
</template>

<script>
  import { error } from '@/components'
  export default {
    components: {
      [error.name]: error
    }
  }
</script>
