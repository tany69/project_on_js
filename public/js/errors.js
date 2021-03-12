export const Errors ={
    data(){
        return{
            errText: ''
        }
    },
    method:{
      setError(mess){
          this.errText= mess
        }
    },
    template:`
    <div class="err-block" v-if="errText">
    <p>
        <button class="btn-err" @click="setError('')">&times;</button>
        {{text}}
    </p>
    </div>
    `
}