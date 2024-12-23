<template>
  <div class="wapper mainBox" id="mainBox">
    <!-- 头部开始 -->
    <!-- 登录 -->
    <!--class="trade-header-index-logbg"-->

    <div class="ptjy_index">
      <div class="trade-header-logbg">
        <div class="login-button"></div>
      </div>
      <div class="fund-info" style="display: none">
        <div class="fund-top">
          <p class="all-fund">总资产(元)<span class="eyes"></span></p>
          <h1 class="hide-fun" data-pas="********">--</h1>
        </div>
        <div class="fund-bottom">
          <ul>
            <li>
              <span class="hide-fun" data-pas="******">--</span>
              <span>浮动收益</span>
            </li>
            <li>
              <span class="hide-fun" data-pas="******">--</span>
              <span>可用资金</span>
            </li>
            <li>
              <span class="hide-fun" data-pas="******">--</span>
              <span>可取资金</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 登录结束 -->
    <!-- 资产信息开始 -->
    <!-- 资产信息模板 -->
    <script id="trade_header" type="text/template">
      <div class="fund-top">
          <p class="all-fund">总资产(元)<span class='eyes'></span></p>
          <h1 class="hide-fun <%= allMoney>100000000||allMoney<-100000000?'h1-smaller':'' %>" data-pas="********" classTemp="h1-higher"><%= allFund%></h1>
      </div>
      <div class="fund-bottom">
          <ul>
              <% fundArr.forEach(function(item,i) { %>
                  <li>
                      <span class="hide-fun <%= flag?'span-smaller':'' %>" data-pas="&nbsp" classTemp="spanBig"><%= (item.val>0)&&(i==0)?"+"+item.val:" "+item.val %></span>
                      <span><%= item.name%></span>
                  </li>
                  <% });%>
          </ul>
      </div>
    </script>
    <!-- 资产信息结束 -->
    <script id="trade_header_hide" type="text/template">
      <div class="fund-top">
          <p class="all-fund">总资产(元)<span class='eyes close-eye'></span></p>
          <h1 class="hide-fun h1-higher <%= allMoney>100000000||allMoney<-100000000?'h1-smaller':'' %>" data-pas="<%= allFund%>" classTemp="h1-higher">********</h1>
      </div>
      <div class="fund-bottom">
          <ul>
              <% fundArr.forEach(function(item,i) { %>
                  <li>
                      <span class="hide-fun spanBig <%= flag?'span-smaller':'' %>" data-pas="<%= (item.val>0)&&(i==0)?" + "+item.val:" "+item.val %>" classTemp="spanBig">&nbsp</span>
                      <span><%= item.name%></span>
                  </li>
              <% });%>
          </ul>
      </div>
    </script>
    <!-- 头部结束 -->
    <!-- nav开始 -->
    <script id="navTemplate" type="text/template">
      <% navArr.forEach(function(arr,i){ %>
          <ul>
              <% arr.forEach(function(item){ %>
                  <li <%=i tem.data %> >
                      <a href="javascript:void(0)">
                          <div class="icon-containter">
                              <img src="<%= item.src%>" alt="">
                          </div>
                          <span><%= item.name%></span>
                      </a>
                  </li>
                  <%});%>
          </ul>
      <%});%>
    </script>
    <div class="line-top-bottom"></div>
    <div class="trade-nav">
      <ul>
        <li data-acId="12310">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTI3RUFEODU2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTI3RUFEODQ2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1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"
                alt=""
              />
            </div>
            <span class="icon-text">买入</span>
          </a>
        </li>
        <li data-acId="12311">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTI3RUFEOEQ2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTI3RUFEOEM2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1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"
                alt=""
              />
            </div>
            <span class="icon-text">卖出</span>
          </a>
        </li>
        <li data-acId="12340">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTM1Rjk0OUU2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTM1Rjk0OUQ2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1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"
                alt=""
              />
            </div>
            <span class="icon-text">撤单</span>
          </a>
        </li>
        <li data-href9="/newjy/qchicang.html">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ0NzVDRDE2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ0NzVDRDA2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1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"
                alt=""
              />
            </div>
            <span class="icon-text">持仓</span>
          </a>
        </li>
      </ul>
      <ul>
        <li data-href9="/newjy/ptjy/qdrwt.html">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVDQzgyMzU2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTVDQzgyMzQ2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1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"
                alt=""
              />
            </div>
            <span class="icon-text">委托</span>
          </a>
        </li>
        <li data-href9="/newjy/ptjy/qdrcj.html">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTZCMjcxQzA2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTZCMjcxQkY2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1Ny1lMTAzYTgzNDk3OWEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7EJ4ohAAAEz0lEQVR42uzcP08UQRQA8NnLhYLGD+LV9nQU2mFlYiyMAQpbDxBRKQCNpQeNiSE5Kq00MbHhS8BH0QKDzze3s7f/Zufvm9mNmUmWmz24Ze/nvPdm9hYzAGCpmbdRIkhgCSyBJbAElloCS2AJLIH9h23s/Mr3k/xRtbICg+c89kH1s5p+9uaKwcHkGPfv4O529vbKaI2YOa8lORhYQA0IS/SP8esLsXeG+9vZoR7NPSTBclSFwgJPrPz1m/h1BvuTLG4OgwBhCRos5olVPr+JB5/By7tZHLBQWFU3MEN1wCq+IBqOtL1utFE0LLAbSU0s47Bzxyoe8vDclaONomExwzcmy1f2OcoQC5pYZXh2oPkl/QFPGyrneNCNpXx9Hp47dTTaHDasSsjbFLfXtdeDEVY9PKclWtwcFq8SFlhHynxldqwa2ngQWLbJnQLL7ndsiv7WmBRLh6cKQZccZYwF7nmwsT8OhhUzuYfHOuPrTfscdjK5g9sqJR5RJaTHgjpWdnINdotvjgXsJ/Z+4XYft9/kldAdbor9o874Bufj5ovyd9dgVyVLrHu4reH2HbfVAVRCNVZrOuGHZQZWxyraGj6Xo/WzJjTDcv8dUix9SMqw6j9+iftleIbIV8ZYZJWwE0s9wvRYfL8Mz1DJPTQWmGN1g5lhleHJ0YCtRqiE9FjMHEsekscTfo3bFKu6f7monlAJT9rkzvv51IG2EvJ+PnXQYLVHmDtWUQi+4uOKFgsIsfwqoRVWHayJ5XbBbx23L9hdAZo1oR7L7x/ECqsMSRmW32T0G24buN0QLKYrWHRrQhes6gj7QYjF2wM+0vB7K56XlWmwgAarCvYRt7/Ea8Icjec02zcFxFiMBqsEm17N8UCPF2gUy5zqSAOBZvcGt5YLaSCrhEsspv683jDp7yAaE2im+cWsEtqFZ441I66E1Us0wDxuHK9PK3YaIw081oRu4SnH8p+a5FhIxc/Z50b79kx/V4w0qISnLF/ZJ1tdeAossLuUrD+Xz0ss5t/kS6PdSnjSrgm7wrOCRVYJebvA7WkLC6jBeNtrjzSiNWGJRonFpFj8/G+hC5UUrIqGI43oc8JmTnvOPyxdYvkfV41F0IwuUcPh5BE+nC+AaRfT+nxlf1w9Fu6PPlwHGGGF6r6kEMTAAgcsrPLQhRU8JGVozXmaUxiRV8ISi7FbozwXGmyB9koyT+te2iiwSCuhPRZEAlugHWjCU/kGySthGwvCYTmB1dBk4dkJR14J5VgsHBZvPvdWzMUJqKtnmEpoh0X4R8e+91bMRf98OVrp7phR9S8gH+G31vkK+hthxQnMRe8c+yOSfDVQLIoR1hGeQZJ771jOSb91ImV4PouCBZ5Y0BdYuxJ+EpdSKCthG4v1g0UXkvXkfiqenTGaG+XMsFxuHe0p6csq4anoz3ymEFAspJtYLqOIKId53uOqzFenoj9zmUIExYJeQtIoucvDUwMH+QfBT/glGvJ81cfSyDK8eHhuW2JtYOfP0LAo52E6OKPwrGDdDBGLMOkbISqrpxGWK8wg1pJuE9BW9RTfamNRjSJiwHFErFZ4BsWy/Xv03kNSE55idx37DxnzwLIZQQShmaX/oS72tCKBpZbAElgCS2AJLLUElsAitH8CDABbblJCqTwmNwAAAABJRU5ErkJggg=="
                alt=""
              />
            </div>
            <span class="icon-text">成交</span>
          </a>
        </li>
        <li data-href9="/newjy/dcgyh/dcg_index.html">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdBM0Q5MDM2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdBM0Q5MDI2MTVDMTFFN0I2QTlDQjEwQTU3NzZCMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWVhOGE4ZS00MzM3LTQxNTEtYWFmMy0zYTViMzQyM2ZlNTIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1Ny1lMTAzYTgzNDk3OWEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5bFj5oAAAC7klEQVR42uycW4hNURjH1+aERi5pRJJLSYpSUlI8iFAk1yIeRm4vTBqXl5EXnlxK80CuEYoYReQeHuaBUpJ5UDzQPNAkzcOMTGaO/9deal7OWd8+e2/79v/Xr87DPus0v/Odvdda32q8crlsGH0GUQGFURiFURiFMRRGYYmk9O9Ff+PMPP+dR8Gh0NXV0l6YCmsGx/iTDJYDoAV4FKbPHnAmjLQi3vR3gUtgMIXp0wCuDXzoUZg7G8FNMITC9FkLWsHQNAsrJ0C1rAR3QR0rTJ9l4D4YTmH6LAKPwEgK02cBeAJGU5g+88BzUE9h+swBL8A4CtNnFngJJlCYPjPAKzCJwvSZZqVNpTB9poBzFKbPZ7CVwnT5ChaDDgpzp8PK+sKbvjvfwRLwidMKdzqtrI9xT1ybcyDrJ1gKPsS9NNpn/P5fltMFloN3lS4oRfRBjeCE8lovARGaY5bdYAV4U+2iKCpsBziV8crqMf7Oa5vrwrDCGsDZhKomqvwGa+xC28QpbBO4kHFZvWCd8TcNTZzC1oOrpsZmaEryx37pD4K8qRZhq8D1jMvqA1vAnaBvDCpMHrm3TMDmZ8oiT8ztxm/imjiFyZqqNQey5GzF5VoH0ApbCO4ZZbMzxdkLzocZQDNxnW9vjHUBvsX/Hc2Ter/xz4eFiqvC5oKHYETGK+swOBnFQNWEzQaPwagcLKiPRDVQJWFyQvgpGGMYp7Dp4BkYSz1uYdJSkjb5eKpxC5tsZU2kFp2wK2ZAh5dxC5MZ8Dcq0QuTDX/Z+O+kFv1Nv91K+0E1+mnFe+Of+eyiHv3E9S2lBV8avTZ+F6WbmvSL7zYrrYeqdMIkcphsNfhFXfoNRFmIS3ell8L0kX2xDUWXFrQJItvUm43fdakULwFSK0xy2/gtqj5WmD43wDbQT2H6yO7GTpNM0yOTwiQXwe4iSYviuNNp0ERhwSLnww4WQVgpwrGOg2F5F+bxn0Ym85OkMIbCKIzCKCx/+SvAAOX8jhxOtzGAAAAAAElFTkSuQmCC"
                alt=""
              />
            </div>
            <span class="icon-text">银证转账</span>
          </a>
        </li>
        <li data-href="/newjy/jy_qindex.html">
          <a href="javascript:void(0)">
            <div class="icon-containter">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3OEI1MjFFODBEMDExRTdCOEQ4RERDOEMzMDZFRjZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3OEI1MjFGODBEMDExRTdCOEQ4RERDOEMzMDZFRjZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njc4QjUyMUM4MEQwMTFFN0I4RDhEREM4QzMwNkVGNkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njc4QjUyMUQ4MEQwMTFFN0I4RDhEREM4QzMwNkVGNkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4vSDUwAAADbklEQVR42uzcXXKbMBAHcMTwnov4YK4vgPuRmc70Jc30OdOL+TregoGCDRIr7a5WcqSZTDDgBP8qaf/ITg0AVKXhmylgBayAFbBPDfZ+WO+z/UjL/tUlAOK5u49vO966r5fu69Qdh61zzc+L18tt2P8JfLBgYzcvVrs4frptEftHo4UFgEcNxpqPHcdzT3fPAE0wbqwgvE2s6dzjuEXqafVTYIHZw1r2tI/usdEbktJYu4/7137FYE3bc08DA3Jg7wdAQYVjmQhYc0+7PfdhThMbkq5ehcECjp4FoVgj9DA84fVgZMHSyVjbWIDCWhYCL7RaDAuUsJyFwVgLAfzAodUSWCAbSAcs8MRy/x40Gi1WUCohFatiwIKHngYd2nc3Wq2C5YM3Zyx+rPWxY/ft4/rNjlarY7nw5tiwjwVkrOHbODxtaHVSWBUBy14JfbDuCsH16xqtoUDJxgbgwUI8D+yFoG9f2G6NhGMDeiixYoH7BTWhc5hwbFgeP4/bLSE2hGD9HZeDaGDCSzO2c8/jVstQCdFY9dsFSGBKWFNb97TwSui4HjuWF1iESogZSnNPU8CiTfrxseaeNmC1rFjQYVVuLNKkr4Q1DcP9QoDGulUwFJY/GH/GosQGRyHYzVhBWPTgqp+xNgqBR8byxIo8hwVi7WesRSGQxQoDk4sNlNWG8/i49cGqAt6ZbJ4A63/kgN1C8IAl+kZu/EoYkrHshYABSzBWqGA5CsHtIBmrb+RP78CvgwwWbWlmWBaqYCoEVqz6t+and/gyFhWr35gKwYu1Z+l+GCWxdaz7e8+KA4sPTC5jUbBw1xMdLF5s8Mfyrexxh6QsFmJpRhyLcUhGjQ1qWExDUhnLNX8yY3nlsC5vgXDGMjvzFWwszbCt09V/Loa3h6WVsTznTOR9cZRbI72MFXg9NLxGDCuFjKUaK2LEBsmMBakMyRwylmqsyC1jMeM1IljIixTPWMnMYanFhqTnMO3Y4FsZVeewZ8hYm+cY6SGZacYiYgUOyUwzFtCgAodkphmLCctzSCa4NANM81W0e8lPhsVQJTPKWAxYfDffqWcsJiz29bBsMlYKN9/ZZKxo70s+Q8by/Gti9iGZVcZiWtdvxLBSjw13+6+ysSL72BCI1bfy32F5tgJWwApYAStgBay0AlbAdNo/AQYAVlSuLnLfMDwAAAAASUVORK5CYII="
                alt=""
              />
            </div>
            <span class="icon-text">更多</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- nav结束 -->
    <!-- 内容部分开始 -->

    <div class="trade-content" id="accordion">
      <div class="line-top-bottom"></div>
      <div class="form-block-area">
        <div class="form-title">场内交易</div>
        <ul>
          <li class="j_xgsg" onclick="xgsgtc()">
            新股申购<i class="new-share"></i>
          </li>
          <li class="j_kzz">新债申购</li>
          <li class="j_ggtjy" style="display: none">港股通</li>
          <li class="j_hgtjy" style="display: none">沪港通</li>
          <li class="accordion">
            <div class="down-arrow arrow-change">
              场内基金<i class="gray-i">包含深圳LOF、上海LOF</i>
            </div>
            <ul>
              <li
                class="span-accordion"
                data-href9="/newjy/cnjj/cnjj_index.html"
              >
                <span></span>深圳LOF
              </li>
              <li class="span-accordion" data-href9="/newjy/lof/lof_index.html">
                <span></span>上海LOF
              </li>
            </ul>
          </li>
          <li
            class="more-block-genre1 j_zqnhg"
            style="border-top: 1px solid #f4f4f4"
          >
            国债逆回购
          </li>
          <li class="more-block-genre1" data-href9="/newjy/gz/gz_index.html">
            新三板交易
          </li>
        </ul>
      </div>
      <div class="line-top-bottom"></div>
      <div class="form-block-area">
        <div class="form-title">
          中信理财<span id="fundSearch">理财资产查询</span><em></em>
        </div>
        <ul>
          <li class="accordion">
            <div class="down-arrow">
              现金理财<i class="gray-i">包含天天利财、现金增值、信金保</i>
            </div>
            <ul style="display: none">
              <li
                class="more-block-genre"
                data-href9="/newjy/ttlc/ttlc_index.html"
              >
                <span></span>天天利财
              </li>
              <li class="j_xjb more-block-genre"><span></span>信金保</li>
              <li
                class="more-block-genre"
                id="xjzz"
                data-ref="/finance/views/loading.html"
              >
                <span></span>现金增值
              </li>
            </ul>
          </li>
          <li id="assetSet">资管大集合</li>
          <li data-href9="/newjy/kfjj/funindex.htm">开放式基金</li>
          <li data-href9="/newjy/otc_new/otc_index.html">
            其他产品<i class="gray-i">包含私募、资管、收益凭证等</i>
          </li>
        </ul>
      </div>
      <div class="line-top-bottom"></div>
      <div class="form-block-area">
        <ul>
          <li class="accordion more-accordion">
            <div class="down-arrow more-title"><span></span>更多</div>
            <ul style="display: none">
              <li
                class="more-block-genre1"
                data-href9="/newjy/gz/gz_index.html"
              >
                股转业务
              </li>
              <li
                class="more-block-genre1"
                data-href9="/newjy/xed/index_new.html"
              >
                新易融
              </li>
              <li
                class="more-block-genre1"
                data-href9="/newjy/xed/index_new.html?funderno=2"
              >
                快e融
              </li>
              <li
                class="more-block-genre1"
                data-href9="/newjy/wltp/wltp_index.html"
              >
                网络投票
              </li>
              <li
                class="more-block-genre1"
                data-href9="/newjy/sshbjj/index.html"
              >
                实时货币基金
              </li>
              <li
                class="more-block-genre1"
                data-href9="/newjy/jjphyw/jjphyw_index.html"
              >
                基金盘后业务
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 内容部分结束 -->
    <!-- 退出按钮开始 -->
    <div class="footer" id="login-out" style="display: none">
      <div class="line01"></div>
      退出
    </div>
    <!-- 退出按钮结束 -->
  </div>
  <!-- 退出按钮结束 -->
</template>
<script>
// import localService from '../../../assets/jy/jyindex/js/jquery-3.1.1.min.js'
import localService from "../../../services/localService";
import service_deal_rzrq from "../service/common/service_deal_rzrq";
import service_ptjy from "../service/trade/service_ptjy";
require("../../../assets/jy/jyindex/js/pop.js");
export default {
  data() {
    return {};
  },
  ready() {
    /*
         下面这段代码是用来控制首页下拉菜单显示状况的
         */
    var Accordion = function (el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      var links = this.el.find(".down-arrow,.down-arrow-h1");
      links.on(
        "click",
        {
          el: this.el,
          multiple: this.multiple,
        },
        this.dropdown
      );
    };

    Accordion.prototype.dropdown = function (e) {
      var $el = e.data.el,
        $this = $(this),
        $next = $this.next();

      // $next.stop(true).slideToggle();
      if ($next.css("display") == "none") {
        $next.show();
      } else {
        $next.hide();
      }
      $this.toggleClass("arrow-change");
      // if (!e.data.multiple) {
      //     $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
      // };
    };
    var accordion = new Accordion($("#accordion"), false);
  },
  attached() {
    var that = this;
    FastClick.attach(document.body);
    localService.saveLocalMesg({ softversion: "3.00.000" });

    /*utils*/
    /*
     * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
     * @param fn {function}  需要调用的函数
     * @param delay  {number}    延迟时间，单位毫秒
     * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
     * @return {function}实际调用函数
     */
    var throttle = function (fn, delay, immediate, debounce) {
      var curr = +new Date(), //当前事件
        last_call = 0,
        last_exec = 0,
        timer = null,
        diff, //时间差
        context, //上下文
        args,
        exec = function () {
          last_exec = curr;
          fn.apply(context, args);
        };
      return function () {
        curr = +new Date();
        (context = this),
          (args = arguments),
          (diff = curr - (debounce ? last_call : last_exec) - delay);
        clearTimeout(timer);
        if (debounce) {
          if (immediate) {
            timer = setTimeout(exec, delay);
          } else if (diff >= 0) {
            exec();
          }
        } else {
          if (diff >= 0) {
            exec();
          } else if (immediate) {
            timer = setTimeout(exec, -diff);
          }
        }
        last_call = curr;
      };
    };

    //template
    function template(text, interpolate) {
      var settings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
      };
      var noMatch = /(.)^/;
      var escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029",
      };

      var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
      var escapeChar = function (match) {
        return "\\" + escapes[match];
      };

      function _template(text) {
        if (!settings && oldSettings) settings = oldSettings;
        var matcher = RegExp(
          [
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source,
          ].join("|") + "|$",
          "g"
        );
        var index = 0;
        var source = "__p+='";
        text.replace(
          matcher,
          function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
              source +=
                "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
              source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
              source += "';\n" + evaluate + "\n__p+='";
            }
            return match;
          }
        );

        source += "';\n";
        if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";

        source =
          "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source +
          "return __p;\n";
        try {
          var render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
          e.source = source;
          throw e;
        }
        var template = function (data) {
          return render.call(this, data);
        };
        var argument = settings.variable || "obj";
        template.source = "function(" + argument + "){\n" + source + "}";
        return template;
      }
      return _template(text);
    }

    /*separated by commas*/
    function toDemi(str) {
      var str1 = str || "";
      return str1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /*effects*/
    /*show hide the fund*/
    var showPro = function (el) {
      this.el = el;
      $(".ptjy_index").off("click").on("click", ".eyes", this.mainFun);
    };

    showPro.prototype.mainFun = function () {
      var $this = $(this);
      // localService.readFileMesg('eyeStatus', function(result) {
      localService.readFileMesg(["eyeStatus"]).then((result) => {
        // var res = JSON.parse(decodeURIComponent(result));
        var res = result;
        res.eyeStatus = !res.eyeStatus;

        localService.saveFileMesg(res);
        $this.toggleClass("close-eye");
        var protects = $(".hide-fun");
        protects.each(function () {
          var $this = $(this);
          var temp = $this.data("pas");
          var cls = $this.attr("classTemp");
          $this.toggleClass(cls);
          $this.data("pas", $(this).text());
          $this.text(temp);
        });
        // localService.saveFileMesg(res, 'eyeStatus',
        //     function() {
        //         $this.toggleClass('close-eye');
        //         var protects = $('.hide-fun');
        //         protects.each(function() {
        //             var $this = $(this);
        //             var temp = $this.data('pas');
        //             var cls = $this.attr('classTemp');
        //             $this.toggleClass(cls);
        //             $this.data('pas', $(this).text());
        //             $this.text(temp);
        //         })
        //     });
      });
    };

    //checkVersion
    function checkVersion(ver, columns) {
      this.ver = ver;
      for (var prop in columns) {
        this[prop] = $(columns[prop]);
      }
      this.checkVersion();
    }

    checkVersion.prototype.checkVersion = function () {
      var _this = this;
      // localService.readLocalMesg(["softversion"], function(oData) {
      localService.readLocalMesg(["softversion"]).then((oData) => {
        oDom.softversion = oData.softversion;
        oData.softversion <= _this.ver
          ? _this.lower.show()
          : _this.higher.show();
      });
    };
    //比较版本号

    function showColumn(ver, column) {
      this.ver = ver;
      this.column = column;
      this.showfun();
    }

    showColumn.prototype.compareVersion = function (v1, v2) {
      var arr1 = v1.replace(/[-_]/g, ".").split(".");
      var arr2 = v2.replace(/[-_]/g, ".").split(".");
      var len = Math.max(arr1.length, arr2.length);
      for (var i = 0; i < len; i++) {
        if (parseInt(arr1[i]) == parseInt(arr2[i])) continue;
        return parseInt(arr1[i]) > parseInt(arr2[i]) ? true : false;
      }
      return false;
    };

    showColumn.prototype.showfun = function () {
      var _this = this;
      $column = $(_this.column);
      // localService.readLocalMesg(["softversion"], function(data) {
      localService.readLocalMesg(["softversion"]).then((data) => {
        var nowVer = data.softversion;
        if (_this.compareVersion(nowVer, _this.ver)) {
          $column.show();
        } else {
        }
      });
    };

    //foos
    var oDom = {
      //买入
      buy: $(".j_bug"),
      //卖出
      sell: $(".j_sell"),
      //撤单
      chedan: $(".j_chedan"),
      //查询资金
      qfund: $(".j_qfund"),
      //我的持仓
      mypositon: $(".j_mypositon"),
      //当日委托
      dayorder: $(".j_dayorder"),
      //当日成交
      daydeal: $(".j_daydeal"),
      //更多
      morefunc: $(".j_morefunc"),
      //银证转帐
      yzindex: $(".j_yzindex"),
      //融资融券
      rzrq: $(".j_rzrq"),
      //开放基金
      kfjj: $(".j_kfjj"),
      //退出登录
      tcdl: $(".j_jyout"),
      //场内基金
      cnjj: $(".j_cnjj"),
      //实时货币基金
      sshbjj: $(".j_sshbjj"),
      //融微贷
      wrd: $(".j_wrd"),
      //股转业务
      gz: $(".j_gz"),
      //沪港通交易
      zqnhg: $(".j_zqnhg"),
      //债券逆回购
    };

    //check login
    function checkLogin() {
      var $login = $(".trade-header-logbg"),
        $info = $(".fund-info");
      // localService.readLocalMesg(['jyloginflag'], function(olocal) {
      localService.readLocalMesg(["jyloginflag"]).then((olocal) => {
        if (olocal.jyloginflag <= 1 || !olocal.jyloginflag) {
          $(".ptjy_index")
            .off("click")
            .on("click", ".login-button", function () {
              // localService.readFileMesg('eyeStatus', function(result) {
              localService.readFileMesg(["eyeStatus"]).then((result) => {
                var res;
                if (result == "" || !result.eyeStatus) {
                  res = {
                    eyeStatus: true,
                  };
                  // localService.saveFileMesg(res, 'eyeStatus',
                  //     function() {
                  //         that.$TZT.action10090({
                  //             'jsfuncname': 'showFund()'
                  //         });
                  //     }
                  // );

                  localService.saveFileMesg(res);
                  showFund();
                  //  localService.saveFileMesg(res).then((result)=>{
                  //     showFund();
                  // });
                } else {
                  // res = JSON.parse(decodeURIComponent(result));
                  res = result;
                  if (res.eyeStatus) {
                    showFund();
                    that.$TZT.action10090({
                      url: "/deal/login?logintype=1",
                    });
                  } else {
                    showHide();
                    that.$TZT.action10090({
                      url: "/deal/login?logintype=1",
                    });
                  }
                }
              });
            });
          $("#login-out").hide();
          $info.hide();
          $login.show();
        } else {
          $info.show();
          $(".trade-header-logbg").hide();
          $("#login-out").show();
          // localService.readFileMesg('eyeStatus', function(result) {
          localService.readFileMesg(["eyeStatus"]).then((result) => {
            var res;
            if (result == "" || !result.eyeStatus) {
              res = {
                eyeStatus: true,
              };
              // localService.saveFileMesg(res, 'eyeStatus',
              //     function() {
              //         showFund();
              //     }
              // );
              localService.saveFileMesg(res);
              showFund();
              // localService.saveFileMesg(res).then((result)=>{
              //    showFund();
              // });
            } else {
              // res = JSON.parse(decodeURIComponent(result));
              res = result;
              if (res.eyeStatus) {
                showFund();
              } else {
                showHide();
              }
            }
          });
        }
      });
    }

    /*查询资产信息*/
    function showFund() {
      $.showPreloader();
      var oSendData = {
        action: 117,
      };
      service_ptjy.require117(oSendData).then((oData) => {
        $.hidePreloader();
        if (oData.ERRORNO < 0) {
          return;
        }
        var TOTALYK_RMB;
        if (oData.GRID0.length == 1) {
          oData.TOTALYK_RMB = "0.00";
        }
        var data;

        // var a = +oData.TOTALASSET_RMB;
        // var b = toDemi(oData.TOTALASSET_RMB);
        // var c = toDemi(oData.TOTALYK_RMB);
        // var d = oData.TOTALYK_RMB;
        // var e = toDemi(oData.USABLE);
        // var f = oData.USABLE;
        // var g = toDemi(oData.GRID2[1].split('|')[2]);
        // var h = oData.GRID2[1].split('|')[2];
        try {
          data = {
            allMoney: +oData.TOTALASSET_RMB,
            allFund: toDemi(oData.TOTALASSET_RMB),
            fundArr: [
              {
                val: toDemi(oData.TOTALYK_RMB),
                realVal: oData.TOTALYK_RMB,
                name: "浮动收益",
              },
              {
                val: toDemi(oData.USABLE),
                realVal: oData.USABLE,
                name: "可用资金",
              },
              {
                val: toDemi(oData.GRID2[1].split("|")[2]),
                realVal: oData.GRID2[1].split("|")[2],
                name: "可取资金",
              },
            ],
            flag: false,
          };
        } catch (e) {
          data = {
            allMoney: 0,
            allFund: "0.00",
            fundArr: [
              {
                val: "0",
                realVal: "0.00",
                name: "浮动收益",
              },
              {
                val: "0",
                realVal: "0.00",
                name: "可用资金",
              },
              {
                val: "0",
                realVal: "0.00",
                name: "可取资金",
              },
            ],
            flag: false,
          };
        }
        data.fundArr.forEach(function (item) {
          if (item.realVal > 1000000000) data.flag = true;
        });
        var compiled = template($("#trade_header").html());
        var fundDiv = compiled(data);
        var $info = $(".fund-info");
        // if (data.flag) {
        //     $info.height($info.height());
        // }
        $info.html(fundDiv);
      });
      // $.getData({
      //     oSendData: oSendData,
      //     isload: false,
      //     fnSuccess: function(oData) {

      //     }
      // });
    }

    function showHide() {
      $.showPreloader();
      var oSendData = {
        action: 117,
      };
      service_ptjy.require117(oSendData).then((oData) => {
        $.hidePreloader();
        if (oData.ERRORNO < 0) {
          return;
        }
        var TOTALYK_RMB;
        if (oData.GRID0.length == 1) {
          oData.TOTALYK_RMB = "0.00";
        }
        var data;
        try {
          data = {
            allMoney: +oData.TOTALASSET_RMB,
            allFund: toDemi(oData.TOTALASSET_RMB),
            fundArr: [
              {
                val: toDemi(oData.TOTALYK_RMB),
                realVal: oData.TOTALYK_RMB,
                name: "浮动收益",
              },
              {
                val: toDemi(oData.USABLE),
                realVal: oData.USABLE,
                name: "可用资金",
              },
              {
                val: toDemi(oData.GRID2[1].split("|")[2]),
                realVal: oData.GRID2[1].split("|")[2],
                name: "可取资金",
              },
            ],
            flag: false,
          };
        } catch (e) {
          data = {
            allMoney: 0,
            allFund: "0.00",
            fundArr: [
              {
                val: "0",
                realVal: "0.00",
                name: "浮动收益",
              },
              {
                val: "0",
                realVal: "0.00",
                name: "可用资金",
              },
              {
                val: "0",
                realVal: "0.00",
                name: "可取资金",
              },
            ],
            flag: false,
          };
        }

        data.fundArr.forEach(function (item) {
          if (item.realVal > 1000000000) data.flag = true;
        });
        var compiled = template($("#trade_header_hide").html());
        var fundDiv = compiled(data);
        var $info = $(".fund-info");
        // if (data.flag) {
        //     $info.height($info.height());
        // }
        $info.html(fundDiv);
      });
      // $.getData({
      //     oSendData: oSendData,
      //     isload: false,
      //     fnSuccess: function(oData) {

      //     }
      // });
    }

    window.showFund = showFund;
    window.showHide = showHide;

    function renderNav() {
      var compiled = template($("#navTemplate").html());
      var data = {
        navArr: [
          [
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAzCAYAAAA0CE5FAAADJElEQVR42uyau2sUQRzHPzcGTKFiESvbFIqFGHPGf0KjhQ9EJIWm1c5H5aPz0aZXS0kXUl57D0+9iEbEKwJJEY0GD8Khx120mYNlszezszuze9nsFw4C89iZz87vNZvCVvEEKemfYf9CGosU5MoB5YByQDmgHFAOKAeUA8qVA0oP0JwsHUx+UUoTk9/cMAG6A5SG6MWX5JqGBlAHuAI0hwBOE7gq1zRUPugncAFopQinBVwENobVSX8GrgO9FOD05LM/2XbSqxpnN2M45wJwPwVAD+SzTTSj2fuqACqaSaYiLPYZ8CpBOK+BpxHGndG0VwRQ1nQqRlz0LaCaAJwqcDPiWB2gmgDqmk4ngdGIkW0aWHMIZ00GhigRa1TuTQm/D6ir6DQCTETcwHfgPNB2AKctX8B6xPETcm+D1AXqQj5oKeZRVOmDxxnaUj94vI8xh851LAHtfph34ai9egM8tgjoiZwzjnR7qnjzIB2gSQubegTMW5hnHnhoYZ6iTUDjwJgFs7gBNGLM0ZBzxDXXMbknZQTzAmoCm47Cvd+xngN+RBi7Ice2Ezg9m8A3f6lRjWmzLkOz7ZRBF3Sq/VMq/DbnKJL5VQZmDfrPhkhorTtoP6ByAibm1UvgeYh+L2Rfm5oM8QJ3AKoB2zEdm6nuAYuK9kXgruVnjgNHFO3bfQftB9QCviQQ7v1XFNeA5YC2ZdnWS/j0fMVzpyWCQptCZx2UDC3pgH/5osg0bi7fdP6n6r8PwiCSFXGjJnBZ1j9d4BLurm+1Vxz+QhSDSNYv8LoOFl4Cbnv+dqER4JQJoILvP8z2Ab+BAxobfsfu1GnN9c4WcNjr90SA06ylZGZJSOega/6gIHRHzGFGnYZ0QWaHDxaDirSEMuqkpTv9b8MA0kWyY8ChXQjnIHA8bAatArQOrCgmEQ4SxqROj+o74AoB17ciTKjLiJmFuiDby4CmbAIqZxCQbs3lQZllkBrAX2D/gPaj2P1KkbY6wEeTE9RB/ykoS2oAf0wAhTGzLKmsCtlGTiujquSAHAAKTJwyKGViLKLaZoakrD11gOp7AJCy9vw/AKIV01L/mao9AAAAAElFTkSuQmCC",
              name: "买入",
              data: "data-acid=12310",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAyCAYAAAD/VJ3gAAAC/0lEQVR42uyZO0wUQRjHf7cHiCRK4QmFlJf4wAQhItR0Bjq1FKmppZVSWwsbtVCjidr4Kuxsd++8AoyJMVqQ0FiRmBAiBNHivkvultuZ2cfd7c7yTza53Mx+u/PLzPfawtkHu6REc8BH+X0V+JSGl3JSAqcMvAQG5Hol/x0BAoaBN8Dppv9KwFsZyzWgIvAcuNhmbFzGinkGdBdYUIwvyJxcAroJrBjMWwEW8wZoBngcYv4juScXgMaAdxKtTDUg94zZDmhIFjoa4d5R4L3YsBJQAXgCTMWwMQk8FVvWAboD3EjAznWxZRWga8BqgvZWBZQVgC4BzxI+FgU5apNZBzQCfOiQYx0Spz2SVUDdCM1RUobQgDaBf4prKaLth8BsF47wrCSSUbSkWfumA3gGWW9Y3QZudTFCLhqWLX5d0Yx7DuBqJk2HfOg8cK9Hhe98woCqDlDTTJoABg0feAF40aMWRVGePW44f1DWplKlAWhfManPMPs9JQ6zl02uYeqNtpLB3ClZW5D2gZoD7ADrMbdiP/CadLRJy9Rbtv0xXcc6sNMI83Ed9X3qTfe0aE7eKc6avOY8SAfosmZ8WbLbMFeU7DnMtRxzB4UCVDY811lRycAdVJsB/QS2Eg73aZZuLVvAD3+pUelAwphW6YJORTLpFkBeTKNZkpGD9gNyc3TEdEHHbQeoChzEdGxZUJnWr7h+HTQctB/Qb+BbTPI27J7vwuIQIJrJKVoLtvuflmDlqAYt9UPaFocKkC6S6Qq8tKsPfR9bCegrsB2zRZBmTQDHFePbwiAQ0F8DP5TUMet07RbFQVeFQSCgJCr7NEsXZA75YCeoSLM0o9bt/s8mgHSR7BxwMoNwTgDnTTNoFaBfwIbCiJPRhHEa9XfADVm7FpCthatRgyzPgGaSBORaCEj3zm5QZtlOa8AucCxg/AzSULJEe8CXMDtoD/2nIJu0BvwJA8jkmNkkVxWyQzktS+UdAeoAoLaJk4VSJsZO1LNpkZS1pw5QLQeAlLXn/wEAY5GQeMM7+vwAAAAASUVORK5CYII=",
              name: "卖出",
              data: "data-acid=12311",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA2CAMAAABUWfHRAAAAbFBMVEX6pwD////6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwC7NIfIAAAAI3RSTlMAAAEDBgkNEhgeJS02P0lUYHmGk5+rtsDJ0trh5+3y9vn8/mGRx1gAAACwSURBVEjH7dXHEsIwDARQhRZCDRB6CbD//4+cExfJeyAX6+iZN+OxrJVIv8YH0atwTmYnMK66gnGrBxi3bcG43ReEmzQA4cozGLe4gXHrJxhXv0G40R4g3PQIxs0vSK5CZHkH4zYvUO6D/zr2nuy70H1I6nvHJfyzrrP/676zzpHjjHPrOltOeJwpl3zOkoN+p+duwKk5H3LaXgk6ZY+FXXxvRly0sstuIJee19kN735ke6GJp9AklAAAAABJRU5ErkJggg==",
              name: "撤单",
              data: "data-acid=12340",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA2AQMAAABKntNUAAAABlBMVEX9bSr9bSoUsnMRAAAAAXRSTlMAQObYZgAAADVJREFUGNNjYGCo////DwMIkMZgYKQ5gzyHwRgkgP////+w////H5mMfwzMP+wbGGjJoMyFAIU3yuyQ0LeeAAAAAElFTkSuQmCC",
              name: "持仓",
              data: "data-href9=/newjy/qchicang.html",
            },
          ],
          [
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAwAQMAAACVLJAzAAAABlBMVEX9bSr9bSoUsnMRAAAAAXRSTlMAQObYZgAAABZJREFUGNNj+A8BDxiozqA6GHXq/wcAvtHrb+nrLtMAAAAASUVORK5CYII=",
              name: "委托",
              data: "data-href9=/newjy/ptjy/qdrwt.html",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA0CAYAAADbsStYAAACn0lEQVR42uya24tNURzHP4ed6yAJ/8OUkgflbkTDRAgPpChyzTx4UMqDeVCEeJgyzWSIB9JoyG1yLUkpSSmZpqZBSHiYZOQyHS/fKZ2cPb89Z619Lta3zsM5+9c6v09rr9/6fdfemf491VnSUYYiahj/iQJoAA2gAbQkFJXiVhBm9N+aBdwDJlYy6BygA1gE3AUmVSLoPEGO1/cZgp1cSaALBVmV8/t03cZTKgF0MXADGJPn+jTgATC1nEFrgasxkAOqBi6UK+gy4IoBEuA9sLMcQZcLcpQh9q3WcGe5ga4ELgMjDLFvBNnlsxjVGpNJojXAJeO4PcACoNvn9rILuAVcdAi7LsF43ZrJHp8NQz3QqP54NdDmAHa9qmZkiO0S5GufLeBe4GSOCVgBtAMjhzjmRuA8MNwQ2wnUqAB5a+r3AcfzOJ067XejE465GThrhHwlyHc+3ct+4IijzX1AW4DTRsiXul0/+LZpY41xS4DrBthtQIsxnxeC/JiGHz0AHDTG1qgiV8VU7Caj2X8uS/YpTePdIGCL5gt2XEzFHkzP1NB/LsYJwyGtV4vmylpNiKnY+fRUkF+GmmhE4ToM/AaOGmJnA7dlsxqM4z9RYestJEkXoADHgP6Y7eZvzdTHosfaqnoLTdBlr3tCa87VQ6tHwFIXkD7cSyOw2wHsQ0F+dZWYD5t2CthRAOx9mexvLpPy5Uebga1at0l0R71yn+uEfBrvVjUD1pntkMnu85GM7xOGZiPsTWAV8N1XImkcpTQB22Ngr8nH/vCZRFpnRi1yJ7lrth1YC/z0nUBEejoj0FZZsTZgA/DL4X9kSwEU4Jxg64BNah1TUSbP6zfl+nw0W+w1WnQF0AAaQEtbUdLqFWY0gAbQABpAA+jg+jMAqnF9PL2b78cAAAAASUVORK5CYII=",
              name: "成交",
              data: "data-href9=/newjy/ptjy/qdrcj.html",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA6CAMAAAAjmzGqAAAAmVBMVEX9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSotXgupAAAAMnRSTlMAAQIEBQgMDRIYGSApMTI8PUdIU1VhYn+Ajo+QnZ6qrLe4wsPNztbf5uft8vP3+vv9/oeJ2P0AAADySURBVEjHvdXHEoJAEEXRFgyYFXNWRMzp/f/HubHcWI5wF/QS5lQN0z0Ps3Q18QyVliXmFAXMKakzp2OLOV1C5nQbMKfniDlp7jOndZk5xdWvR+lq32BOpw5zuvaZ0yNfB/cJz+Xdh6x939XQvGwqaM4WRTTX4wK5R/dhnjkBcwnm4NaVu97kl1u5cr601I83M9d/JYgk8A31RMQ1DyKuexZxg5uIGz0FnD//3JMsrLwWcdVYxDX2mZPJzKx9EnG9q5B7KF/Xh/u0DjsX3AfcdzxnZsUFc1YYM2c2vDNn4YU5ax2ZozmIc9eV83/Km6Zc+AImbdbWCkM0QgAAAABJRU5ErkJggg==",
              name: "银证转账",
              data: "data-href9=/newjy/dcgyh/dcg_index.html",
            },
            {
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAyAgMAAAB5bYCsAAAACVBMVEX9bSr////9bSqCqEi7AAAAAnRSTlMAAHaTzTgAAAAgSURBVCjPYwhFBQEMowKoAqtWrVrAgEwOa4HR2KdUAABckyyIiooBDwAAAABJRU5ErkJggg==",
              name: "更多",
              data: "data-href9=undefined",
            },
          ],
        ],
      };
      var fundDiv = compiled(data);
      $(".trade-nav").html(fundDiv);
    }

    //表单模板 采用递归
    //暂不使用，待后台配置JSON后可使用
    //数据格式  字段意义：show为true则展示，open为true默认打开下拉菜单 con为名称 href为链接
    var listArr = [
      {
        con: "场内交易",
        show: true,
        children: [
          {
            con: "新股申购",
            href: "/newjy/xgsg/xgsg_indexnew.html",
            show: true,
          },
          {
            con: "港股通",
            show: false,
          },
          {
            con: "沪港通",
            href: "/newjy/ggt/jysy.html",
            show: false,
          },
          {
            con: "场内基金",
            des: "包含深圳LOF、上海LOF",
            children: [
              {
                con: "深圳LOF",
                href: "/newjy/cnjj/cnjj_index.html",
                show: true,
              },
              {
                con: "上海LOF",
                href: "/newjy/lof/lof_index.html",
                show: true,
              },
            ],
            open: true,
            show: true,
          },
        ],
      },
      {
        con: "中信理财",
        show: true,
        children: [
          {
            open: false,
            con: "现金理财",
            show: true,
            des: "包含天天利财、现金增值、信金保",
            children: [
              {
                con: "天天理财",
                href: "/newjy/lof/lof_index.html",
                show: true,
              },
              {
                con: "信金保",
                show: true,
              },
              {
                con: "现金增值",
                href: "/newjy/lof/lof_index.html",
                show: true,
              },
            ],
          },
          {
            con: "开放式基金",
            href: "/newjy/kfjj/funindex.htm",
            show: true,
          },
          {
            con: "其他产品",
            show: true,
            href: "/newjy/otc_new/otc_index.html",
            des: "包含私募、资管、收益凭证等",
          },
        ],
      },
      {
        con: "更多",
        open: false,
        show: true,
        children: [
          {
            con: "股转业务",
            href: "/newjy/gz/gz_index.html",
            show: true,
          },
          {
            con: "新易融",
            href: "/newjy/xed/index_new.html",
            show: true,
          },
          {
            con: "快易融",
            href: "/newjy/xed/index_new.html?funderno=2",
            show: true,
          },
          {
            con: "网络投票",
            href: "/newjy/wltp/wltp_index.html",
            show: true,
          },
          {
            con: "实时货币基金",
            href: "/newjy/sshbjj/index.html",
            show: true,
          },
          {
            con: "基金盘后业务",
            href: "/newjy/jjphyw/jjphyw_index.html",
            show: true,
          },
        ],
      },
    ];

    function isShow(show) {
      return show ? "" : ' style="display:none"';
    }

    function reDes(des) {
      return des ? '<i class="gray-i">' + des + "</i>" : "";
    }

    function reHref(href) {
      return href ? ' data-href9="' + href + '"' : "";
    }

    //递归方法
    function createList(json, deep, open, show) {
      var str =
        "<ul" +
        (open == void 0 || open == true
          ? "" + isShow(show) + ""
          : ' style="display:none"') +
        ">";
      json.forEach(function (item) {
        if (deep === 1 && !item.hasOwnProperty("open")) {
          str +=
            '<li class="form-block-area" ' +
            isShow(item.show) +
            '><div class="form-title ">' +
            item.con +
            reDes(item.des || "") +
            "</div>";
        } else if (deep === 1 && item.hasOwnProperty("open")) {
          return (str +=
            '<li class="form-block-area">' +
            createList([item].slice(), 2, true, item.show) +
            "</li>");
        } else {
          if (item.hasOwnProperty("open")) {
            str +=
              '<li class="accordion' +
              (item.open ? " arrow-change" : "") +
              isShow(item.show) +
              '"><div class="down-arrow">' +
              item.con +
              reDes(item.des || "") +
              "</div>";
          } else {
            str +=
              "<li" +
              isShow(item.show) +
              reHref(item.href || "") +
              ">" +
              (deep === 2 ? "<span></span>" : "") +
              item.con +
              reDes(item.des || "");
          }
        }
        if (item.children) {
          str += createList(item.children, deep++, item.open, item.show);
        }
        str += "</li>";
      });
      str += "</ul>";
      return str;
    }

    /*new share*/
    function newShare() {
      $.showPreloader();
      var oSendData = {
        action: 686,
        nPage: 1,
        maxcount: 100,
        ReqlinkType: "1",
      };
      service_deal_rzrq.require686(oSendData).then((oData) => {
        $.hidePreloader();
        if (oData.ERRORNO < 0) {
          return;
        }
        var aGrid = oData.GRID0;
        var sStr = aGrid.length;
        var n = sStr - 1;
        if (n == 0) {
          $(".new-share").html("");
        } else {
          $(".new-share").html("今日有" + n + "支新股可申购");
        }
      });
      // $.getData({
      //     oSendData: oSendData,
      //     isToken: false,
      //     isload: false,
      //     fnSuccess: function(oData) {
      //         var aGrid = oData.GRID0;
      //         var sStr = aGrid.length;
      //         var n = sStr - 1;
      //         if (n == 0) {
      //             $(".new-share").html('');
      //         } else {
      //             $(".new-share").html('今日有' + n + '支新股可申购');
      //         }
      //     },
      //     oConfig: function(oData) {
      //         if (oData.ERRORNO < 0) {
      //             return;
      //         }
      //     }
      // })
    }

    function attrUrl(oDom) {
      var jDom = oDom;
      $.each(jDom, function (index, obj) {
        $(obj)
          .unbind()
          .on("click", function () {
            if ($(obj).attr("data-url")) {
              var url = $(obj).attr("data-url");
              T.fn.changeurl(url);
            } else if ($(obj).attr("data-acId")) {
              var acId = $(obj).attr("data-acId").split("|");
              //var type = $(obj).attr('data-type') || '1';
              var traObj = {
                action: acId[0],
              };
              var isaction = true;
              if (acId.length > 1) {
                traObj.url = encodeURIComponent(acId[1]);
                if (acId[2]) {
                  traObj.datetype = acId[2];
                }
                if (acId[3]) {
                  traObj.title = encodeURIComponent(acId[3]);
                }
                if (acId[4]) {
                  traObj.stockcode = acId[4];
                }
                isaction = false;
              }
              //CITICSPiwik Start页面统计添加
              //var u="//piwik.citicsinfo.com/piwik/";
              //var piwikTracker = Piwik.getTracker(u+'piwik.php', 1);
              //piwikTracker.trackEvent('交易', '交易_买入', '', 1);
              // if(traObj.action == "12310") {
              //   _paq.push(['trackEvent', '交易', '交易_买入']);
              // } else if(traObj.action == "12311") {
              //   _paq.push(['trackEvent', '交易', '交易_卖出']);
              // } else if(traObj.action == "12340") {
              //   _paq.push(['trackEvent', '交易', '交易_撤单']);
              // }
              //CITICSPiwik End
              // T.fn.tradeaction(traObj);
              that.$TZT.tradeaction(traObj);
            } else if ($(obj).attr("data-href9")) {
              //CITICSPiwik Start页面统计添加
              //   if($(obj).attr('data-href9') == "/newjy/ptjy/qcxzj.html") {
              //   _paq.push(['trackEvent', '交易', '交易_查询资金']);
              // } else if($(obj).attr('data-href9') == "/newjy/qchicang.html") {
              //   _paq.push(['trackEvent', '交易', '交易_我的持仓']);
              // } else if($(obj).attr('data-href9') == "/newjy/ptjy/qdrwt.html") {
              //   _paq.push(['trackEvent', '交易', '交易_当日委托']);
              // } else if($(obj).attr('data-href9') == "/newjy/ptjy/qdrcj.html") {
              //   _paq.push(['trackEvent', '交易', '交易_当日成交']);
              // } else if($(obj).attr('data-href9') == "/finance/views/loading.html") {
              //   _paq.push(['trackEvent', '交易', '交易_现金增值']);
              // } else if($(obj).attr('data-href9') == "/newjy/kfjj/funindex.htm") {
              //   _paq.push(['trackEvent', '交易', '交易_开放式基金']);
              // } else if($(obj).attr('data-href9') == "/newjy/xgsg/xgsg_indexnew.html") {
              //   _paq.push(['trackEvent', '交易', '交易_新股申购']);
              // } else if($(obj).attr('data-href9') == "/newjy/dcgyh/dcg_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_银证转账']);
              // } else if($(obj).attr('data-href9') == "/newjy/ttlc/ttlc_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_天天利财']);
              // } else if($(obj).attr('data-href9') == "/newjy/sshbjj/index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_实时货币基金']);
              // } else if($(obj).attr('data-href9') == "/newjy/cnjj/cnjj_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_场内基金']);
              // } else if($(obj).attr('data-href9') == "/newjy/jjphyw/jjphyw_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_基金盘后业务']);
              // } else if($(obj).attr('data-href9') == "/newjy/ggt/jysy.html") {
              //   _paq.push(['trackEvent', '交易', '交易_沪港通交易']);
              // } else if($(obj).attr('data-href9') == "/newjy/gz/gz_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_股转业务']);
              // } else if($(obj).attr('data-href9') == "/newjy/xed/index_new.html") {
              //   _paq.push(['trackEvent', '交易', '交易_新易融']);
              // } else if($(obj).attr('data-href9') == "/newjy/xed/index_new.html?funderno=2") {
              //   _paq.push(['trackEvent', '交易', '交易_快e融']);
              // } else if($(obj).attr('data-href9') == "/newjy/wltp/wltp_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_网络投票']);
              // }
              //CITICSPiwik End

              console.log(this);
              that.$TZT.action10090({
                url: that.$TZT.action10061({
                  url: $(obj).attr("data-href9"),
                  isExport: true,
                }),
              });
            } else if ($(obj).attr("data-href")) {
              //CITICSPiwik Start页面统计添加
              // if($(obj).attr('data-href') == "/newjy/jy_qindex.html") {
              //   _paq.push(['trackEvent', '交易', '交易_更多']);
              // } else if($(obj).attr('data-href') == "/newjy/otc/otc_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_OTC交易']);
              // }
              //CITICSPiwik End
              that.$TZT.action10061({ url: $(obj).attr("data-href") });
            } else if ($(obj).attr("data-rzrqurl9")) {
              //CITICSPiwik Start页面统计添加
              // if($(obj).attr('data-rzrqurl9') == "/newjy/rzrq/rzrq_index.html") {
              //   _paq.push(['trackEvent', '交易', '交易_融资融券']);
              // }
              //CITICSPiwik End
              that.$TZT.action10090({
                url: that.$TZT.action10061({
                  url: $(obj).attr("data-rzrqurl9"),
                  isExport: true,
                }),
                logintype: 2,
              });
            }
          });
      });
    }

    function pageEvent() {
      var $attrs = $("li,.skip-to-column");
      attrUrl($attrs);
      window.OnCheckXjb = function () {
        // localService.readLocalMesg(['jyloginflag'], function(oLocal) {
        localService.readLocalMesg(["jyloginflag"]).then((oLocal) => {
          if (oLocal.jyloginflag <= 1) {
            that.$TZT.action10061("/newjy/xjb/xjb_index.html");
          } else {
            require.async("/newjy/xjb/js/checkRight.js", function (f) {
              f.getRight();
            });
          }
        });
        // _paq.push(['trackEvent', '交易', '交易_信金保']);
      };

      window.OnCheckXJ = function () {
        // localService.readLocalMesg(['jyloginflag'], function(oLocal) {
        localService.readLocalMesg(["jyloginflag"]).then((oLocal) => {
          if (oLocal.jyloginflag > 1) {
            var obj = {};
            var oSend = {
              action: 5801,
            };
            obj["oSendData"] = oSend;
            // obj["fnSuccess"] = function(oData) {

            // }
            $.showPreloader();
            service_ptjy.require5801(obj).then((oData) => {
              $.hidePreloader();
              if (oData.ERRORNO < 0) {
                return;
              }
              var productinfo = oData.GRID0;
              if (!productinfo) {
                return;
              }
              if (productinfo.length > 1) {
                var product = productinfo[1];
                var fundCode = product.split("|")[7];
                var status = product.split("|")[8];
                if (fundCode == "900016") {
                  //已经登录已经注册现金增值跳转详情页
                  var secondUrl =
                    "http://action:10061/?secondtype=9&&url=/finance/views/setting.html";
                  var url =
                    "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/finance/views/manager.html&&secondtype=99&&secondtext=更多&&secondurl=" +
                    encodeURIComponent(secondUrl);
                  that.$TZT.action10061({
                    url: url,
                  });
                } else {
                  localService.saveMapMesg({
                    userInfo900016: JSON.stringify(oData),
                  });
                  var url = "/finance/views/loading.html";
                  that.$TZT.action10061({
                    url: url,
                  });
                }
              } else {
                var url = "/finance/views/loading.html";
                localService.saveMapMesg({
                  userInfo900016: JSON.stringify(oData),
                });
                that.$TZT.action10061({
                  url: url,
                });
              }
            });

            // $.getData(obj)
          } else {
            var url = "/finance/views/loading.html";
            that.$TZT.action10061({
              url: url,
            });
          }
        });
        // _paq.push(['trackEvent', '交易', '现金增值']);
      };
      window.OnCheckQx = function (url) {
        this.$TZT.action10090({ url: url, isCheckLoginRight: "ggt" }); //检查港股通权限
      };
      window.OnGzCheckQx = function () {
        var oSendData = {
          action: 122,
        };
        $.showPreloader();
        service_ptjy.require5801(oSendData).then((oData) => {
          $.hidePreloader();
          if (oData.ERRORNO < 0) {
            return;
          }
          if (oData.ERRORNO < 0) {
            alert(oData.ERRORMESSAGE);
            return;
          }
          var grid0 = oData.GRID0;
          var shaArr = [],
            szaArr = [],
            shbArr = [],
            szbArr = [];
          var shaqxArr = "",
            szaqxArr = "",
            shbqxArr = "",
            szbqxArr = "";
          for (var x = 1; x < grid0.length; x++) {
            var aItem = grid0[x].split("|");
            var wtacount = aItem[oData.WTACCOUNTTYPEINDEX].toUpperCase();
            var acounttype = aItem[oData.HOLDERKINDINDEX];
            if (wtacount == "SHACCOUNT") {
              if (acounttype == "0") {
                shaArr.push(aItem[oData.STOCKACCOUNT]);
                shaqxArr = aItem[oData.RIGHTSINDEX];
                console.log(shaqxArr);
              } else if (acounttype == "4") {
                shbArr.push(aItem[oData.STOCKACCOUNT]);
                shbqxArr = aItem[oData.RIGHTSINDEX];
              }
            }
            if (wtacount == "SZACCOUNT") {
              if (acounttype == "0") {
                szaArr.push(aItem[oData.STOCKACCOUNT]);
                szaqxArr = aItem[oData.RIGHTSINDEX];
                console.log(szaqxArr);
              } else if (acounttype == "4") {
                szbArr.push(aItem[oData.STOCKACCOUNT]);
                szbqxArr = aItem[oData.RIGHTSINDEX];
              }
            }
          }
          if (
            shaArr.length == 0 &&
            shbArr.length == 0 &&
            szaArr.length == 0 &&
            szbArr.length == 0
          ) {
            alert("您未在上交所和深交易所开通有效的股东账户，请到营业部开户！");
            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") >= 0 &&
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") >= 0
          ) {
            //T.fn.action10061('/index.html#!/deal/reverseRepo/index');

            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            // that.$TZT.action10090({url:that.$TZT.action10061({url:url,isExport:true})});

            var url = "/index2.html#!/deal/reverseRepo/repoList?chicang=1";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });

            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") >= 0 &&
            szaArr.length == 0
          ) {
            //.fn.action10061('/index.html#!/deal/reverseRepo/index');
            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            var url = "/index2.html#!/deal/reverseRepo/repoList";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });
            return;
          } else if (
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") >= 0 &&
            shaArr.length == 0
          ) {
            //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            var url = "/index2.html#!/deal/reverseRepo/repoList";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });
            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") == -1 &&
            szaArr.length == 0
          ) {
            //1代表沪，2代表深，3代表沪深
            localService.saveMapMesg({ gznhglh: 1 }, function () {});
            gznhgPOP();
            return;
          } else if (
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") == -1 &&
            shaArr.length == 0
          ) {
            localService.saveMapMesg({ gznhglh: 2 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") == -1 &&
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") == -1
          ) {
            localService.saveMapMesg({ gznhglh: 3 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") >= 0 &&
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") == -1
          ) {
            localService.saveMapMesg({ gznhglh: 2 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shaArr.length != 0 &&
            shaqxArr.indexOf("f") == -1 &&
            szaArr.length != 0 &&
            szaqxArr.indexOf("f") >= 0
          ) {
            localService.saveMapMesg({ gznhglh: 1 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") >= 0 &&
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") >= 0
          ) {
            //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            var url = "/index2.html#!/deal/reverseRepo/repoList";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") >= 0 &&
            szbArr.length == 0
          ) {
            //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            var url = "/index2.html#!/deal/reverseRepo/repoList";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });
            return;
          } else if (
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") >= 0 &&
            shbArr.length == 0
          ) {
            // T.fn.action10061('/index.html#!/deal/reverseRepo/index');
            // var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
            // var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
            var url = "/index2.html#!/deal/reverseRepo/repoList";
            that.$TZT.action10090({
              url: that.$TZT.action10061({ url: url, isExport: true }),
            });
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") == -1 &&
            szbArr.length == 0
          ) {
            localService.saveMapMesg({ gznhglh: 1 }, function () {});
            gznhgPOP();
            return;
          } else if (
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") == -1 &&
            shbArr.length == 0
          ) {
            localService.saveMapMesg({ gznhglh: 2 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") == -1 &&
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") == -1
          ) {
            localService.saveMapMesg({ gznhglh: 3 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") >= 0 &&
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") == -1
          ) {
            localService.saveMapMesg({ gznhglh: 2 }, function () {});
            gznhgPOP();
            return;
          } else if (
            shbArr.length != 0 &&
            shbqxArr.indexOf("f") == -1 &&
            szbArr.length != 0 &&
            szbqxArr.indexOf("f") >= 0
          ) {
            localService.saveMapMesg({ gznhglh: 1 }, function () {});
            gznhgPOP();
            return;
          }
        });
        // $.getData({oSendData:data,isload:false,fnSuccess:function(oData){

        // }});
      };
      window.xgsgtc = function () {
        that.$TZT.action10061({
          url: "/newjy/purchase_new_share/html/purchase_index.html",
        });
      };
      function loginOut() {
        // if (confirm('是否退出当前账号?')) {
        //     that.$TZT.changeurl('http://action:10402/?');
        //     checkLogin();
        //     $('.trade-header-logbg').show();
        //     $('.fund-info').hide();
        // } else {

        // }

        $.confirm("是否确认退出？", function () {
          //          localService.removemapMesg(['channelgj']);
          $(".trade-header-logbg").show();
          $(".fund-info").hide();
          $("#login-out").hide();
          setTimeout(function () {
            checkLogin();
          }, 200);

          // checkLogin();
          // that.$TZT.action10402();

          that.$TZT.action10408();
        });
      }

      function goToFund() {
        // that.$TZT.action10090({
        //     'jsfuncname': goFund(),
        //     logintype: '1'
        // });
        goFund();
      }
      window.goFund = function () {
        that.$TZT.action10061({
          url: "/fund/fund/my_financial_asset.html",
        });
      };
      $(".j_ggtjy").on("click", function (e) {
        that.$TZT.action10090({
          url: "/deal/ggt/index",
          isCheckLoginRight: "ggt",
        }); //检查港股通权限
        //                 that.$TZT.action10090({
        //                     'jsfuncname': OnCheckQx(),
        //                     logintype: '1'
        //                 });
        //                OnCheckQx()
      });
      $(".j_kzz").on("click", function () {
        that.$TZT.action10061({ url: "/newjy/kzzsg/kzzsg_index.html" });
      });
      $(".j_zqnhg").on("click", function (e) {
        // that.$TZT.action10090({
        //     'jsfuncname': OnGzCheckQx(),
        //     logintype: '1'
        // });
        OnGzCheckQx();
      });

      $("#assetSet").click(function () {
        //  /investment/product_list/html/product_list_index.html?type=zg
        that.$TZT.action10090({
          url: that.$TZT.action10061({
            //
            url: "/investment/asset_manage_set/asset_manage_prolists.html",
            //                  secondtype: '9', //自定义图片
            //                  secondtext: 'tzt_titlesearch.png', //自定义图片名称
            //                  secondurl: encodeURIComponent('http://action:10061/?secondtype=9&&url=/investment/search/html/licai_search.html'), //图片跳转地址
            isExport: true,
          }),
        });
      });

      $(".j_xjb")
        .off()
        .on(
          "click",
          throttle(function () {
            OnCheckXjb();
          }, 1000)
        );
      $("#xjzz").off().on("click", OnCheckXJ);
      $("#fundSearch").off().on("click", goToFund);
      $("#login-out").off().on("click", loginOut);
    }

    var masterstroke = {
      CustomerTnformation: function (fn) {
        var oSendData = {
          action: 187,
        };
        $.showPreloader();
        service_ptjy.require187(oSendData).then((oData) => {
          // $.getData({oSendData:{action:187},fnSuccess:function(oData){//保存本地个人、机构标识，供接下来的页面使用
          var arr = oData.GRID0[1].split("|");
          localService.saveMapMesg({ grjgbs: arr[oData.ORGANPROPINDEX] });
        });
        var oSend = {
          action: 6009,
        };
        service_ptjy.require6009(oSend).then((oData) => {
          // $.getData({oSendData:oSend,fnSuccess:function(oData){
          if (oData.ERRORNO < 0) {
            if (oData.ERRORMESSAGE.indexOf("144843") >= 0) {
              // TZT.fn.action10061('/newjy/suitability/risk_test.html');
              that.$TZT.action10061("/newzt/zt/zt_riskeva.html?laiyuan=cwjj");
            } else {
              alert(oData.ERRORMESSAGE);
            }
          }
          if (oData.GRID0.length <= 1) {
            //6009接口数据没返回，直接风测
            // TZT.fn.action10061('/newjy/suitability/risk_test.html');
            that.$TZT.action10061("/newzt/zt/zt_riskeva.html?laiyuan=cwjj");
          } else {
            var arr = oData.GRID0[1].split("|");
            if (arr[oData.PROFFLAGINDEX] == "1") {
              //专业
              fn && fn();
            } else {
              //非专业
              //var date = new Date();
              //var str1 = date.getFullYear();
              //var str2 = ((date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1));
              //var str3 = ((date.getDate())>9?(date.getDate()):'0'+(date.getDate()));
              //var str = str1+''+str2+''+str3;
              oSendData = {
                action: 5,
              };
              service_ptjy.require5(oSend).then((data) => {
                // $.getData({oSendData:{action:5},fnSuccess:function(data){//接口5获取服务器时间
                if (data.TIME) {
                  var arr1 = data.TIME.split(" ");
                  var str =
                    arr1[0].split("-")[0] +
                    "" +
                    arr1[0].split("-")[1] +
                    "" +
                    arr1[0].split("-")[2];
                } else {
                  var time = new Date();
                  var arr1 = "";
                  var str =
                    "" +
                    time.getFullYear() +
                    (time.getMonth() + 1 > 9
                      ? time.getMonth() + 1
                      : "0" + (time.getMonth() + 1)) +
                    time.getDate();
                }

                if (
                  arr[oData.RISKLEVELINDEX] > "0" &&
                  Number(arr[oData.VALIDDATEINDEX]) >= Number(str)
                ) {
                  //有效测评（到期日与服务器当天时间做对比）
                  that.$TZT.action10061("/newjy/suitability/risk_confirm.html");
                } else {
                  //无效测评
                  // TZT.fn.action10061('/newjy/suitability/risk_test.html');
                  that.$TZT.action10061(
                    "/newzt/zt/zt_riskeva.html?laiyuan=cwjj"
                  );
                }
              });
            }
          }
        });
      },
    };

    function gznhgPOP() {
      var pop = new window.pop.window();
      pop.cfg.text4ConfrimBtn = "确定";
      pop.cfg.text4CancelBtn = "取消";
      pop.confirm({
        hasCloseBtn: false,
        title: "尚未开通",
        content: "您尚未签署债券质押式逆回购委托协议，是否现在签署？",
        handler4ConfrimBtn: function () {
          pop.destroy();
          localService.saveMapMesg({
            yessdx: "0",
            jjbz: "gznhg",
            jjcode: "",
            jjdjgsdm: "",
          });
          masterstroke.CustomerTnformation(function () {
            that.$TZT.action10061("/newjy/gznhg/gznhg_kt.html");
          });
        },
        handler4CancelBtn: function () {},
        callBack: function () {
          $(".window_ConfrimBtn").css({
            backgroundColor: "rgb(249, 98, 104)",
          });
        },
      });
    }
    window.GoBackOnLoad = function () {
      var uaipone = JSON.parse(cNative.getDeviceInfo());
      var platform = uaipone.platform.toLowerCase();
      localService.readLocalMesg(["softversion"]).then((oData) => {
        if (oData.softversion >= "3.00.005") {
          if (cNative.isEmployee() == "1") {
            //判断员工登录
            if (platform == "ios") {
              alert(
                "《证券法》规定证券从业人员在执业期间不得直接或者以化名、借他人名义持有、买卖股票，也不得收受他人赠送的股票。信e投APP不对公司内部员工开放场内股票、债券、基金交易的功能，但您可以正常购买理财板块的理财产品。有关公司员工投资行为管理的要求请参见《中信证券股份有限公司员工证券投资行为管理规定》。"
              );
            } else if (platform == "android") {
              cNative.onEmployeeWarn();
            }
          }

          checkLogin();
        } else {
          checkLogin();
        }
      });
    };

    function init() {
      checkLogin();
      newShare();
      pageEvent();
      new checkVersion("2.01.004", {
        lower: ".j_hgtjy",
        higher: ".j_ggtjy",
      });
      //new showColumn('2.04.005', '#assetSet')
      new showPro($(".fund-info"));
      localService.saveMapMesg({ gznhglh: "" }, function () {});
    }
    init();
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "../../../assets/jy/jyindex/css/base-min.css";
@import "../../../assets/jy/jyindex/css/trade_index";
@import "../../../assets/jy/jyindex/css/pop.css";
.explain .content {
  padding-top: 1.6rem;
}
</style>
<style lang="less">
@sizeNum: 2rem;
.fund-info {
  width: 100%;
  overflow: hidden;
  background: #3d4353;
}

.fund-info .fund-top {
  position: relative;
}

.fund-top .all-fund {
  color: #dddddd;
  padding-left: 0.425926 * @sizeNum;
  padding-top: 0.55 * @sizeNum;
  position: relative;
  font-weight: bold;
  font-size: 0.35 * @sizeNum;
}

[data-dpr="1"] .fund-top .all-fund {
  font-size: 13.15px;
}

[data-dpr="2"] .fund-top .all-fund {
  font-size: 26.6px;
}

[data-dpr="3"] .fund-top .all-fund {
  font-size: 41px;
}

.all-fund span {
  display: inline-block;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAmCAYAAACVr4jIAAAEhklEQVR42syaf2iVVRjHv7vepk2YoiyVmUZb+KMtpoSDmpktKvqhBVFG9INSGBGVFPVfJFQk9VfQLyMTZhAUVNCfKRZai6WFw4pcUakt1ly72uaPrX3657lweznv+5733nOnDxy43Pc8P77vc85znuc5bw2gKtISSWslrZJ0haSLJM21Z8OSBiX9KKlH0m5Jh6plSE0VgM6XtFHSXZJaM/IeltQtabukY0GtAkKN5cAO4AyV01lgp8kMYl8Ijy6Q9Lyk+yXlk96ppAFJf9nvBuPNJfBMSNoh6VnjPScezQGPAycTPPMdsAVYDdQ7ZNTbs+eAbxPknAAeNZ1l2VsuyCXA1zFGnQLeANrKkNsGbEtY/vuA5qkC+jDwj8OIceA1oDHAnrrYXtZ4jHfvqybQGRZsXLQ7ZOAoGSuAvTE63wamhwbaCHzjUDYGPAHUpPDXArcA7wLfA8PAceCAee76BBnFWDDq0P8lMD8U0FbgiENJL7DMg/9O4FePI+Ur82CcnBagz8H3s8++TTPyWqDgEL7NvJTEO828lYXGLbrGyZwJfOjg+zPlJSUCvdWWZhZDiqMG6K4gYXgsRfYWYDLCUwDWZgW63hHiC7aXfJb75gozowngmhQdGxw2jgKdvkBvcwgYBFZ6glwUEziy0g9APkXXDQ5do0BHGtDrHMv1N2BphiPhVcLRvR76OoCRCN8I0B4HtNXBcAS4NAPI6cDfAYF+5ql3lcP2wdJoXJy40HGEHCsj3eogLJ0B6jLoji7jw0ADoJykOkmfSFpYkusXJN0kqT9jjdAWuLatlbTUc+5eSesknS35r1nSB5Jqc5LekrSy5OGYpBsl9ZVZsoWmLDJ3SXrIysAirZG0NSdpKDI5L2lmmUblqtEFyTh/wOrYUponC+G7HBVCexlJ+JOEp6sylnkjjlS1rjhhFnDQEbVaMgK9OTDIf802H93NZnMpHbVA+7/jpckxcQC4LAPQ2dbvCUU9nnobLMJGE4f2uISh3eH6P4DLM4D9KCDQLk+QfY4UckNaCug6j4aAKz2BXh0IZD9wQYquBcChCN8ksNE3qe90pIKFuITZMboDAL3dY0/2O/g2Zy3TXAnzOPCIB9BZMUWyL72cIn+NdSiinny63MK7IyZ3fd2jsmi0tklWeiWlNfOgo7qasKZdRa2UFuD3mH5NUwpvPfCeJ8ATrr0V6S686eA7DdwRsjnW61ByEtjkwb8a+Nh6vjii+lZgXkp18pOD97i1e4K3O+OCzKfAJR4y6uwIW2/7rCllmV4IvBDT3+3zWFEVNbA3xXQQxsyoOQH6uXngASv6XfSOLeWqX0ksB/bHGFEAXspYsBfHHOvh/hIjewi4eyrvXopv/SnHeVuap+6xc60l5oIob1lXl+3h0wnBamexiD5X14aLJL0o6Z6UMu2UXe4OS5omabakRkkzUuT3SHpG0hfny0VwG/B+TOAohz4H1nlcd0yZR6O0WFKXeXhxRt6j1tbZLunA+f4NQymtkNRpH2sss7bIXEmTtoQHJB2UtF/SPkm9kTZIMPpvABuchErgEKzHAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  width: 1.537037 * @sizeNum;
  height: 1.361111 * @sizeNum;
  background-size: 0.537037 * @sizeNum 0.361111 * @sizeNum;
  background-position: center center;
  position: absolute;
  top: 50%;
  margin-left: -0.3 * @sizeNum;
  margin-top: -0.4 * @sizeNum;
}

.all-fund .close-eye {
  display: inline-block;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAdCAYAAAD2DA/hAAADLklEQVR42uSZW4iNURTH/2cwB01GcpmRhiSEmpJrUSMxyjV5UbxQoom88ODy5hLKJeGBIUTy4FI8MOEFGUUyNTHlQUoYYhoz5urnwT51bHvv7ztjzMxpVu1Oe33/vb/139/aa+29TgJQb5Ic9TLptYSHSaqQ9EPSbUlDspRPX0nlkuolPZE06S8EIOAEf8oFo8+2tt3icdfGpL5wobUOaySVZNnXLZC0w9KN8rn0eUufkHRKUm4WET4lKd/SnfW5tIA7/C3HssSVtzpsrwGSNja9MwlodAzc1MPJLgOaLZt/AotceFux0UG4DVjVQ8nOAxocNp/0jbEVOcBLD+ktPYzsCo9HPgVy4xAuAZ4TliNA324mmgPsBNo9Nn4G5ocIjwOuEV8qgcndRHYMcC+Gja3AZh/hpsDANo++CdgN5HcR0TzzVRvJTMrtSC0PsBHYAxQANwITvgfKgIH/iWg+sA34FLDhPlAKvPM8fwQUhghfBoqsPbPLuIlPvgDHgZkG/y8k+wMLgXNAfeCd7cC+tJgyAnjowb4DilOEUznsmQlcPkPKYrrRB+Ci2UNzgZFAwjNnP2AssNws6m1PmrHlBTDdMV8SOO0Z8zJFeAgwIWLVR0e4VZQ0AR+BN2mttoNzHYyRKcocHtnkysO+gOHKzW8Mia6WSxkcSmrtY3KcnHfT8dJPJkUkgdXAg0BE76h8B64C1Y69OyUm6aHmaFya2lZRA/Y6DGk2e9PGDgfWBQ4EUdJmcvxRYCkwwMy7xIG90dGgmAgU8cZLemWuiumy3nnt+i0LJN21dCclVUsalHZ9azHYWWm415ImeuZ9LGl2+iXP9CszvkQGVmO2Y2UPR6xgueOrDfdgD1nYtxH7kahqRpwWetjPHMTT3ahPAJ8EvmZg1H5HXAjZU+EgPTVTwqGqZaukOZJWSlpqftsD+FJJgy3dlQC+zupHVVd2OXRFnV2mbZF0XdItST8jsMVWv1nStQC+zernRcxfaSqSKakxldZuq0tXWB5wUdK3AL7K6lfHeMcGSYslrZU0TVJDZwatjrQS4IwplyYjsAngAFAHVAEzuuLmleht/y39GgC4cFbg+tbX1wAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  width: 1.537037 * @sizeNum;
  height: 1.361111 * @sizeNum;
  background-size: 0.537037 * @sizeNum 0.361111 * @sizeNum;
  background-position: center center;
  position: absolute;
  top: 50%;
  margin-left: -0.3 * @sizeNum;
  margin-top: -0.4 * @sizeNum;
}

.fund-top h1 {
  font-weight: bold;
  color: #ffffff;
  padding-left: 0.42 * @sizeNum;
  line-height: 1.6;
  font-size: 0.6 * @sizeNum;
  position: relative;
}

.fund-top .h1-higher {
  top: 0.25 * @sizeNum;
}

[data-dpr="1"] .fund-top h1 {
  font-size: 37.5px;
}

[data-dpr="2"] .fund-top h1 {
  font-size: 75px;
}

[data-dpr="3"] .fund-top h1 {
  font-size: 112.5px;
}

[data-dpr="1"] .fund-top .h1-smaller {
  font-size: 30px;
}

[data-dpr="2"] .fund-top .h1-smaller {
  font-size: 60px;
}

[data-dpr="3"] .fund-top .h1-smaller {
  font-size: 90px;
}

@media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone4/4s */
  [data-dpr="1"] .h1-smaller {
    font-size: 30px;
  }
  [data-dpr="2"] .fund-top h1 {
    font-size: 60px;
  }
  [data-dpr="3"] .fund-top h1 {
    font-size: 90px;
  }
}

@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone5 */
  [data-dpr="1"] .h1-smaller {
    font-size: 30px;
  }
  [data-dpr="2"] .fund-top h1 {
    font-size: 60px;
  }
  [data-dpr="3"] .fund-top h1 {
    font-size: 90px;
  }
}

.fund-bottom {
  display: table;
  width: 100%;
  position: relative;
  margin-top: 0.2 * @sizeNum;
}

.fund-bottom:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  border-top: 1px solid #4f5461;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  -ms-transform: scale(0.5, 0.5);
  -o-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.fund-bottom ul {
  display: table;
  width: 100%;
  margin-top: 0.15 * @sizeNum;
  margin-bottom: 0.15 * @sizeNum;
}

.fund-bottom ul li {
  position: relative;
  display: table-cell;
  text-align: center;
  width: 33.3333%;
  font-size: 1.8;
  box-sizing: border-box;
}

.fund-bottom ul li:before {
  content: "";
  position: absolute;
  top: 15%;
  width: 100%;
  height: 150%;
  right: -49%;
  border-right: 1px solid #4f5461;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  -ms-transform: scale(0.5, 0.5);
  -o-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.fund-bottom ul li:nth-child(3) {
  border-right: none;
}

.fund-bottom ul li span {
  display: block;
}

.fund-bottom ul li span:nth-child(1) {
  color: #ffffff;
  font-weight: bold;
}

[data-dpr="1"] .fund-bottom ul li span:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0.08 * @sizeNum;
}

[data-dpr="2"] .fund-bottom ul li span:nth-child(1) {
  font-size: 28px;
  font-weight: bold;
  margin-top: 0.08 * @sizeNum;
}

[data-dpr="3"] .fund-bottom ul li span:nth-child(1) {
  font-size: 41px;
  font-weight: bold;
  margin-top: 0.08 * @sizeNum;
}

.spanBig {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAAAZCAYAAAA40GzsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZDA4NTIxMC1iYzYwLTQxMGYtOTFmMS1iZTY3ZGFiYTg1MjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTEyNUFDMzU1QTM1MTFFNzhGRUZDNkU2RjA4OTZGQTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTEyNUFDMzQ1QTM1MTFFNzhGRUZDNkU2RjA4OTZGQTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1Y2YzOGU5Mi01ZDI5LTQwM2ItODcyZC1jNzM1MWRlNDUzY2IiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYWQ2YWVhYS03ZjUzLTExN2EtODM1Ny1lMTAzYTgzNDk3OWEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47IaP0AAABpUlEQVR42uxaO2oDMRDVBuM2W/gIrkya3MKtIQdInTbXSJPCZ0lj8ClSJTdwwOvSLI4yIhNYxEorBXlh38yDB4s+83hiEFppKmutSYQ/sDLjQar2JL3fGIWiMDSpFJpUiukkVU1cFoy75JgpkKqN690d1ImvxDPxhVhzm08ffWNqjnHmmCaBUrVhvbvGO2LbmXggPhFnGQIznnPo9LccO2ZMqja0d9e5s/14J64TBNY8tg+7AXNStaG9uwH3xL0N44246mlfcV8Ie44dMydVG9p7V2hD/AgMbhPbLMfYZJwrJGtDevdF5sRn4tHm48hz5/9YWMnacN5DQgviNpKZfvZueY4pQKnaMN6HhB6Il0jwb+JjwUVVbQDvulvoTnX1nUrPVHqmKnqmGvoT6G6Jl5H/QlC1Ib3n3Fk0nbZm5PsSNG1o7zm3q77AmDe7aNrQ3nPegUICY7xBoWlDe895sY4JXPu1HFEb1ntlf2vUXR3MgvgZqZdpiLf8fRqo23G1NV88J6WuR6I2rPe/pEpBjkBpSNWepHctJ1ZojbpCk0ohED8CDAB8Z3fHPBf4RAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: 1.3796296296296295 * @sizeNum 0.23148148148148148 * @sizeNum;
  background-position: center;
  padding-bottom: 0;
}

.fund-info .fund-bottom ul li span.span-smaller {
  font-size: 0.259 * @sizeNum;
  padding-top: 0.1 * @sizeNum;
  padding-bottom: 0.1 * @sizeNum;
}

.fund-bottom ul li span:nth-child(2) {
  color: #dddddd;
  font-weight: bold;
}

[data-dpr="1"] .fund-bottom ul li span:nth-child(2) {
  font-size: 12px;
}

[data-dpr="2"] .fund-bottom ul li span:nth-child(2) {
  font-size: 24px;
}

[data-dpr="3"] .fund-bottom ul li span:nth-child(2) {
  font-size: 36px;
}
</style>
