<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <form class="form-send" v-on:submit="send">
            <div class="form-group">
              <div>name</div>
              <div class="form-send__wrap">
                <editbl class="form-send__fake-item" :context="info.user" @update="info.user = $event"></editbl>
                <p class="form-send__text-item" v-html="info.user"></p>
              </div>
              <div>text</div>
              <div class="form-send__wrap">
                <editbl class="form-send__fake-item" :html="info.content" @update="info.content = $event"></editbl>
                <p class="form-send__text-item" v-html="info.content"></p>
              </div>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          <div>
            last save:
            <form v-on:submit="get">
              Enter Name
              <input type="text" v-model="formName">
              <input type="submit">
              <div>
                User: <span v-html="getInfo.user"></span>
              </div>
              <div>
                Content: <span v-html="getInfo.content"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent,quotes,semi,keyword-spacing */

  export default {
    name: 'Index',
    data: function () {
      return {
        formName: "",
        info: {
          "user": "",
          "content": ""
        },
        getInfo: {
          "user": "",
          "content": ""
        }
      }
    },
    methods: {
      send: function () {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        let self = this;
        xhr.open("PUT", 'https://evening-savannah-67907.herokuapp.com/api/v1/sys/signals', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
          if (xhr.status === 500) {
            alert("Unexpected backend error")
          } else if (xhr.status === 400) {
            alert("Validation error")
          } else {
            alert("Date send");
            self.info.user = "";
            self.info.content = "";
          }
        };
        console.log(JSON.stringify(self.info));
        xhr.send(JSON.stringify(self.info));
      },
      get: function () {
        event.preventDefault();
        let xhrt = new XMLHttpRequest();
        let selft = this;
        xhrt.open("GET", 'https://evening-savannah-67907.herokuapp.com/api/v1/sys/signals/' + selft.formName, true)
        console.log(JSON.stringify(this.info));
        xhrt.onload = function () {
          if (xhrt.status === 500) {
            alert("Unexpected backend error")
          } else if (xhrt.status === 400) {
            alert("Validation error")
          } else {
            let data = JSON.parse(xhrt.responseText);
            console.log(data);
            selft.getInfo = data;
          }
        };
        xhrt.send();
      }

    }
  }
</script>


<style>
  .form-send__wrap {
    position: relative;
  }
  .form-send__fake-item {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    min-height: 42px;
  }
  .form-send__text-item {
    border: 1px solid;
    padding: 10px;
    min-height: 42px;
    border-radius: 4px;
  }
</style>
