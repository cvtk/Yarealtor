<template>
  <label :class="$style.upload" v-if="type === 'hidden'">
    <slot></slot>
    <input :class="$style.upload__input" type="file" accept="image/x-png,image/gif,image/jpeg" ref="input" :multiple="multiple === true" @change="upload">
  </label>
  <label :class="$style.upload" v-else>
    <div :class="$style.upload__progress" :style="{ 'width': progress + '%' }" v-show="loading === true"></div>
    <span :class="$style.upload__icon"></span>
    <span :class="$style.upload__notification">
      <span v-if="loading === true">{{ progress }}%</span>
      <span v-else><slot></slot></span>
    </span>
    <input :class="$style.upload__input" ref="input" accept="image/x-png,image/gif,image/jpeg" type="file" :multiple="multiple === true" @change="upload">
  </label>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .upload {
    display: block;
    position: relative;
    height: 48px;
    cursor: pointer;
    &:after { @include clearfix }
  }
  
  .upload__progress {
    position: absolute;
    width: 0;
    height: 4px;
    bottom: 0;
    left: 0;
    color: #fff;
    z-index: 1;
    background-color: #26C281;
  }

  .upload__input {
    position: absolute;
    visibility: hidden;
  }

  .upload__icon {
    display: block;
    background-color: #3e4b5c;
    padding: 10px 12px;
    height: 100%;
    float: left;
    line-height: 30px;
    &:after {
      content: "\e032";
      font-family: "Icons";
      font-size: 22px;
      color: #fff;
    }
  }

  .upload__notification {
    display: block;
    position: relative;
    margin-left: 46px;
    height: 100%;
    border: 1px solid #c2cad8;
    border-left-color: transparent;
    color: #3e4b5c;
    text-align: center;
    font-style: italic;
    line-height: 46px;

  }
</style>

<script>
  import md5 from 'js-md5';
  import firebase from '../../firebase.js';
  import fface from '../helpers/fireface.js';

  const ref = firebase.storage().ref();

  export default {
    name: 'upload-images',
    props: ['type', 'multiple', 'value'],
    data() {
      return {
        path: '/images/',
        images: {},
        progress: 0,
        loading: false
      }
    },
    methods: {
      averageProgress(images) {
        let progressSum = 0,
            totalCount = 0;

        for ( let key in images ) {
          progressSum += images[key].progress;
          totalCount++;
        }
              
        return Math.round(progressSum / totalCount);

      },

      md5file(file) {
        return md5(file.lastModified + file.size + file.name);
      },
      hash() {
        let hash = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for( var i=0; i < 15; i++ )
        hash += possible.charAt(Math.floor(Math.random() * possible.length));

        return hash;
      },
      upload(e) {
        this.loading = true;
        this.images = {};
        Array.prototype.forEach.call(e.target.files, file => {
          fface.storage.uploadImage(file).then( results => {
            let images = results.reduce( (result, item) => {
              let name = item.metadata.name.replace(/\..+$/, '');
              result[name] = item.downloadURL;
              return result;
            }, {});
            this.$emit('input', images);
            this.$refs.input.value = '';
          })
        })
        // Array.prototype.forEach.call(e.target.files, file => {
        //   let name = this.md5file(file),
        //       dir = this.path + name;

        //   ['orig', 'small', 'medium' ].forEach( size => {

          
        //     let fullRef = dir + '/' + size + '.jpg',
        //         task = ref.child(fullRef).put(file);

        //     this.$set( this.images, name, { name: name } )
            
        //     task.on('state_changed',
        //       state => {
                
        //         let currentProgress = Math.round((state.bytesTransferred / state.totalBytes) * 100);
        //         this.$set( this.images[name], 'progress', currentProgress );
        //         this.progress = this.averageProgress(this.images);
        //       }, 
        //       error => {
        //         console.log(error);
        //       },
        //       () => {
        //         let currentUrl = task.snapshot.downloadURL;
        //         this.$set( this.images[name], size, currentUrl );
        //         if ( this.images[name].progress >= 100 ) {
        //           this.$emit('input', this.images[name]);
        //           this.loading = false;
        //           this.$refs.input.value = '';
        //         }
        //       }
        //     )
        //   })
        // });
      }
    }
  }
</script>