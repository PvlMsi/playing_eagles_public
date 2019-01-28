<template>
  <b-modal
    :id="'player-'+player.id+'-modal'"
    ref="modal"
    ok-title="Dodaj"
    cancel-title="Anuluj"
    :title="player.name"
    @ok="handleSubmit"
  >
    <form>
      <b-form-group label="Czy gracz stosował zasady fair-play?">
        <b-form-radio-group
          v-model="fairPlay"
          :options="options"
          name="fairPlayRadio"
          :buttons="true"
          button-variant="primary"
        >  
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Czy polecasz gracza?">
        <b-form-radio-group
          v-model="wouldRecommend"
          :options="options"
          name="wouldRecommendRadio"
          :buttons="true"
          button-variant="primary"
        >  
        </b-form-radio-group>
      </b-form-group>
      <b-form-textarea
        :rows="3"
        v-model="comment"
      ></b-form-textarea>
    </form>
  </b-modal>
</template>

<script>
  export default {
    props: ['player'],
    data: () => {
      return {
        comment: null,
        wouldRecommend: null,
        fairPlay: null,
        options: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      handleSubmit() {
        const params = {
          player_id: this.$props.player.id,
          comment: this.comment,
          wouldRecommend: this.wouldRecommend,
          fairPlay: this.fairPlay,
        }
        this.$store.dispatch('addOpinion', params)
      }
    }
  }
</script>
