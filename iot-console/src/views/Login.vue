<template>
  <div class="LoginPage flex-column align-items-center">
    <b-container>
      <div class="Login-header my-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="276" height="91">
          <rect fill="#ffffff" fill-opacity="0.0" height="93" width="278" y="-1" x="-1" />
          <g display="none" overflow="visible" y="0" x="0" height="100" width="100">
            <rect fill="url(#gridpattern)" stroke-width="0" y="1" x="1" height="400" width="580" />
          </g>
          <title>Layer 1</title>
          <g stroke="null">
            <g
              stroke="null"
              transform="matrix(1.24768236662107,0,0,1.24768236662107,-18332.158758498263,-12691.933125327341) "
            >
              <g stroke="null">
                <path
                  stroke="null"
                  d="m14720.7 10207.1l-2 0c-0.3 0-0.1 0-0.1 0.3l0 15c0 0.3-0.2 0.7 0.1 0.7l2 0c0.3 0 0.8-0.4 0.8-0.7l0-7 5.9 7.5c0 0.1 0 0.2 0.3 0.2l2.5 0c0.5 0 0.6-0.6 0.4-0.9l-6.4-7.7 6-6.6c0.3-0.3 0.1-0.7-0.4-0.7l-2.3 0c-0.2 0-0.2 0-0.3 0.1l-5.6 6.4 0-6.2c-0.1-0.4-0.6-0.4-0.9-0.4z"
                  class="st0"
                />
              </g>
              <g stroke="null">
                <path
                  stroke="null"
                  d="m14751.4 10207.1l-2.2 0c-0.2 0-0.7-0.1-0.7 0.2l0 9.6c0 3.5 2.9 6.3 6.5 6.3 3.6 0 6.5-2.8 6.5-6.3l0-9.6c0-0.2-0.1-0.2-0.3-0.2l-2.2 0c-0.3 0-0.5-0.1-0.5 0.2l0 9.4c0 1.9-1.5 3.5-3.5 3.5 -2 0-3.5-1.5-3.5-3.5l0-9.4c0-0.3 0.2-0.2-0.1-0.2z"
                  class="st0"
                />
              </g>
              <g stroke="null">
                <path
                  stroke="null"
                  d="m14791.5 10207.3c0-0.2-0.3-0.4-0.6-0.4l-9.7 0c-0.2 0-0.5 0.2-0.5 0.4l0 1.9c0 0.2 0 0.4 0.2 0.4l5.5 0 0 0.1 -6.6 12.4 0.1 0.4c0 0.2 0.3 0.4 0.5 0.4l9.2 0c0.3 0 0.5-0.4 0.5-0.4l0.6-1.9c0-0.2-0.2-0.4-0.4-0.4l-5.9 0 0 0 7-12.5 0-0.4 0.1 0z"
                  class="st0"
                />
              </g>
              <g stroke="null">
                <path
                  stroke="null"
                  d="m14914.3 10233.5l0-60 -85.2 0c-6.5 0-12.2 4.1-14.2 10.3l-0.5 1.4 -119.9 0 0 60 108.8 0 2.8-8.3 -4.1-0.2 -1.6 4.5 -101.9 0 0-52 114.5 0 -14.8 44.4 116.1 0 0-0.1zm-32.1-38.4c0-0.2 0.2-0.4 0.4-0.4l9.4 0c0.3 0 0.4 0.2 0.4 0.4l0 1.9c0 0.2-0.2 0.4-0.4 0.4l-6.8 0 0 3.8 5.7 0c0.2 0 0.4 0.2 0.4 0.4l0 1.9c0 0.3-0.2 0.4-0.4 0.4l-5.7 0 0 4 6.8 0c0.3 0 0.4 0.2 0.4 0.4l0 1.9c0 0.2-0.2 0.4-0.4 0.4l-9.4 0c-0.3 0-0.4-0.2-0.4-0.4l0-15.1zm-27.7 0c0-0.2 0.2-0.4 0.4-0.4l2.1 0c0.2 0 0.4 0.2 0.4 0.4l0 12.9 5.9 0c0.3 0 0.4 0.2 0.4 0.4l0 1.9c0 0.2-0.2 0.4-0.4 0.4l-8.4 0c-0.3 0-0.4-0.2-0.4-0.4l0-15.2zm-29.9 14.8l6.8-12.4 0-0.1 -5.7 0c-0.2 0-0.4-0.2-0.4-0.4l0.6-1.9c0 0 0.2-0.4 0.4-0.4l9 0c0.2 0 0.4 0.2 0.4 0.4l0 0.3 -6.8 12.5 0 0 5.9 0c0.3 0 0.4 0.2 0.4 0.4l0 1.9c0 0.2-0.2 0.4-0.4 0.4l-9.8 0c-0.2 0-0.4-0.2-0.4-0.4l0-0.3z"
                  class="st0"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <!-- FORM -->
                <k-login-form @logged-in="afterLogin" />
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BContainer, BRow, BCol, BCardGroup, BCard, BCardBody } from 'bootstrap-vue';
import { KLoginForm } from '@kuzzleio/kuzzle-application-builder';

@Component({
  components: {
    KLoginForm,
    BContainer,
    BRow,
    BCol,
    BCardGroup,
    BCard,
    BCardBody,
  },
})
export default class Login extends Vue {
  protected afterLogin(): void {
    if (this.$route.query.to) {
      this.$router.push({ name: this.$route.query.to as string });
      return;
    }
    this.$router.push({ name: 'home' });
  }
}
</script>

<style lang="scss">
.Login-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
