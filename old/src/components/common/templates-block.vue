<template>
  <div class="yxdTitle" v-if="gzydxFlag">意向单列表</div>
  <div class="table-cont content infinite-scroll" v-infinite-scroll="loadMore" v-bind:style="tableContStyle">
    <component :is="isapp" v-bind:action="action" v-bind:viewname="viewname" v-bind:stockcode="stockcode"></component>
    <div v-if="noData" class="noData">
      <p class="img"></p>
      <span class="block">~ 查无数据 ~</span>
    </div>
  </div>
</template>

<script>
  import localService from '../../services/localService'
  import util from '../../util/util'
  import Vue from 'vue'
  /*let sUrl = util.getUrlParameter('url');
  if(sUrl){
    sUrl = decodeURIComponent(sUrl);
  }else {
    sUrl = 'deal/views/rzrq/ons/chicang'
  }*/
  export default{
    props: ["url","action","viewname","stockcode"],
    data(){
      var app = this.url || this.$route.query.url || 'deal/views/rzrq/ons/chicang';
      return {
        textTitleArray:[],
        gridTitle:[],
        path:'',
        app:'',
        isExample:false,
        noData:false,
        isapp:app,
        gzydxFlag:false, //股转意向单标题是否显示
        tableContStyle:1,
      }
    },
    created(){
      var sUrl = this.isapp;
      Vue.component(this.isapp, function (resolve, reject) {
        require(['./qTemplates-block/'+sUrl+'.vue'],resolve);
      });
      this.isExample = false;
      this.isExample = true;
    },
    attached(){
      this.url = (!!this.url?this.url:'');
      this.action = (!!this.action?this.action:'');
      this.viewname = (!!this.viewname?this.viewname:'');
      this.stockcode = (!!this.stockcode?this.stockcode:'');
      if(!!this.action && (this.action == '13012' || this.action=='13013')){
        this.gzydxFlag = true;
        this.tableContStyle = 'top:25px;';
      }
    },
    methods: {
      init(){

      },
      loadMore () {
        this.$broadcast('child-loadMore');
      },
      titleTotal(obj){
        this.textTitleArray = obj.textTitleArray;
        this.gridTitle = obj.gridTitle;
      }
    },
    filters: {
      textAgline(index,length){
        if(index == 0){
          return 'left';
        }
        if(index == length-1){
          return 'right';
        }
      }
    },
    events:{
      'parentData':function (oData) {
        var ZZPINDEX = oData.ZZPINDEX,
            DATEFORMINDEX = oData.DATEFORMINDEX,
            hidesegment = oData.HIDESEGMENTINDEX || '';
        var savemapobj = {
          HIDESEGMENTINDEX:hidesegment,
          ZZPINDEX:ZZPINDEX || '',
          DATEFORMINDEX:DATEFORMINDEX || ''
        };
        localService.saveMapMesg(savemapobj);
      },
      noDataBlock:function () {
        this.noData = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  /*没有数据*/
  .noData{text-align: center;padding-top: 50px;color: #5f5f5f;}
  .noData .img{
    width:20%;
    padding-bottom:20%;
    margin:0 auto 5px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACOCAMAAADQI8A6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUE5NzVFQTgyQjhGMTFFNkJGMzI4MzU4RkNDMTJBOTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUE5NzVFQTkyQjhGMTFFNkJGMzI4MzU4RkNDMTJBOTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQTk3NUVBNjJCOEYxMUU2QkYzMjgzNThGQ0MxMkE5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQTk3NUVBNzJCOEYxMUU2QkYzMjgzNThGQ0MxMkE5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhDN7SkAAACcUExURc3Nzdzc3Pz8/P7+/vLy8t/f39HR0c/Pz+3t7f///+/v7/v7+/r6+t7e3vf39+Pj4+rq6tPT0/39/c7OztnZ2ezs7Pb29u7u7tDQ0Nra2uLi4tXV1eTk5NTU1Obm5uvr6+Xl5dLS0vn5+enp6eHh4fj4+PX19dfX19vb29bW1vDw8PHx8djY2PT09N3d3efn5/Pz8+jo6MzMzP///yULPgkAAAA0dFJOU////////////////////////////////////////////////////////////////////wBLVyJlAAAG7ElEQVR42tSc6WKiMBCAw6HcqKAoar21HnXbJe//btskIMiVgIDZ+VukH0nmyMwkANYXU15vLP+yVUDwK0DZXnxrs5bNF14JapLog/EsKJDZeKCbneE4+mEUUGV00J32cYy1DwJGAf7aaBNH0oUUS//LOqz2k8l0OpnsVwfrq58iEnSpJRxzk/xfynmp2jn/SrLV5VlJEm/MFnC8XjwwijD0tLKHNW8oxEig5zWMYwvx185lpvGX5Hk8moLXIM7xT/Ratydr7EOvyT03+uWfY0M44jKapo+hWFVzxeFHNGVLsQmcaTTk42s903YdR9M8fRlnFy2asVzf9MsRkLB7DUcN9WNxgy+JvAh1Un0BR7RCJzSU4IsiDUMXZ4l1cU6ha+qJsAERe6EzO9XDmRAl3cqwIZG3xFhMauBogyaH5nmABlJVHIdolKvCRkUlIy441XCMT2L3bNiw2MQqfhpVcAyil4IIGxeRDPvCYMfZEZUaaLAFCRflaMeKYxCaPWxJhoTHYMMJZ0qFrYlaOF9ZHAevYqDDFkXHMcKnQ8fRyFJrleaXh6iKRMUZtD1Tyfka0HAm7a7i9HqelOOc3FzoNgRPg3sqwxGxigtaFzhkkY7EEhwc33yIsBMRsb+winHw+nJt2JHYbkZrkjg7pROlSn2+sivAwZPZgx0Kjn+EfJwpjv3ELnFEHB9O83BEvJ+SYaci4/2XmIOz7HyqHtO1zOIckVebiV3jiGi/A44ZHJwVGMLOBTuLP2kcG0cgUvc4Eo6uvBQOVvIbfIPISWUPcTycFYBvkXFieEBigcvvwZETKk1wTPC+wSHDA8wEzgYBXt+Fc0X/fRPjSMggf8C3CYo0+tIDR3+TzXmyPfoDB2m5W26QJe+qy7VstijrV6/coIlupOsIxwA0b3U8kNzVp1oxbtVUknuYHY40zwWMEGdN0/JVnHD/PFahOX7GqfcVTdfXIY6PVlLxZ0vWU7HqxE5zeip5WcUzpiFd8gmOg759XvzSZapIw1zxMFPlm2Xxo3M0fg7G0cvn6p4uUwmsOEL6l/fy2dIxzgHFz8UDec6UzRin65T54bl4QaBdwwHjjEq/2MxW8eZsOPPsL83SkRwhHLPcBqrZly7YcBbZX6rlltD8xdGT4U+OkufUONlwcmqmxcrukcUD8NZd0aoMecCGE1SZZk3BqQqA3fsZvnt0sMaMf3Fm5RZhmn3phQ3nkv3ltNy6zSAwKftyI/uRjOmfQXZYDcp+3QTYANlVjFnAmOKwgyoGFD8tA+w/y/y/lx4e5p1qLz04ZeViCXtRgOLSfulbv59fyp5UIAmBWL5Ln0YObgOQu/6qYF77FSKMY7+CMf9CTh/4mYRYVtZxx8C5UieMGTs8ZU15Fo2LDy4sTsjY4BymK1Tep94EnHEbbai9KmgOLmBbbp1iovuPXWsLL9k/d5a+GWRvt0DpJqtNlz2aUQByct9vEZTvxzT84ASA4kq6kymvOBxNFmdLmTNFZzWDrQsxgxf2nUq7QpwEiwvtRIgLZQgwuhESYNDDr46EhF/U4LQjCYNTuUIw3qaEobvZccGRsrGhbfu6knDbR9sUdyXRppiSMsDiNLBUy//8SBlQEio4Vdb3XqVxzuWm/5FQMakpd08JlBdLXai17W/ZA490EyUZB+EOGSjwUo3AHtGivEcyjpaqxJ4fbc3rL6Ap2TaWZNITqUqdlnQPt/4fp5rL5kDfoicSubQ0N5T8KI9fx5ncw3ZuixZdhGluWhHgFzhqf17cq8KIUb7BL/uUZBGAXiKJeQJrVwVGWz8600tX3lOJhF5AgtIjB+Yu2Q+q6I/Usu9QE1OPAhJLeU2LCyXugGmEpOmFpViDZ/SpvMZWfFTdRJLvRlvU5nefKX8b28C4+MhWmrWTWf3+4F68+MWJnzyNQy1Bp0qzjIVrafmUtZz1Jjlhm/Oz+nrKCI6pU5suXDOX9U/p1LXiz//qp6MpisbOlier3kf6AYYtZaasz9z0oE36QRWxGFKJ2aaHCi0hzjc7kM9kNXNaQqo0zDj7EROMwGbCbzkNMxXbiWSLdsCvv2E036SdyE7hVG22cqa9WfGpx8EPc/k/v9mqRiuadBpmFCkAi4NapfJf1IpWs1HP8a7D1byHZLBa3yqnnosa9XhrY+SsyZO3FljeGoQ5a5/mrbmct9Z76HF1MKHDYxt7lmMbvB1q6fbIj0bF4exAFG/Hxdo/TLevdJiOt6OGvB3E5O2YKm+HeFs+4ly4KP+XA+CQt+PxvF0eAJu7WuHWxNUKkLeLJyBn13JA3i4tgZxd6YJt+6sX3jB6m//zOiAkXF2WhP8VT1dJkciDo4u2wtiDo2vIonXEzyVtMVPzV9j9E2AAnJn+yQ3dJlEAAAAASUVORK5CYII=') no-repeat;
    background-size: 100% 100%;
  }

  .yxdTitle{
    background: #fff;position: relative;font-size: 14px;display: inline-block;width: 100%;border-bottom: 1px solid #ccc;color: #828282;text-align: center;
  }
</style>
  