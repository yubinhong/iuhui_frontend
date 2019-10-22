/*
*@Name: 母婴商城
*@Author: xuzhiwen
*@Copyright:layui.com
*/

layui.define(['layer'],function(exports){
	const layer = layui.layer;
	
const car = {
  init : function(){
  		const uls = document.getElementById('list-cont').getElementsByTagName('ul');//每一行
  		const checkInputs = document.getElementsByClassName('check'); // 所有勾选框
      const checkAll = document.getElementsByClassName('check-all'); //全选框
      const SelectedPieces = document.getElementsByClassName('Selected-pieces')[0];//总件数
      const piecesTotal = document.getElementsByClassName('pieces-total')[0];//总价
      const batchdeletion = document.getElementsByClassName('batch-deletion')[0]//批量删除按钮
      //计算
      function getTotal(){
          const seleted = 0,price = 0;
          for(var i = 0; i < uls.length;i++){
        			if(uls[i].getElementsByTagName('input')[0].checked){
                seleted += parseInt(uls[i].getElementsByClassName('Quantity-input')[0].value);
                price += parseFloat(uls[i].getElementsByClassName('sum')[0].innerHTML);
              }
      		}
          SelectedPieces.innerHTML = seleted;
          piecesTotal.innerHTML = '￥' + price.toFixed(2);
      }

      function fn1(){
        alert(1)
      }
      // 小计
      function getSubTotal(ul){
        const unitprice = parseFloat(ul.getElementsByClassName('th-su')[0].innerHTML);
        const count = parseInt(ul.getElementsByClassName('Quantity-input')[0].value);
        const SubTotal = parseFloat(unitprice*count)
        ul.getElementsByClassName('sum')[0].innerHTML = SubTotal.toFixed(2);
      }

      for(let i = 0;i < checkInputs.length;i++){
        checkInputs[i].onclick = function(){
          if(this.className === 'check-all check'){
            for(let j = 0;j < checkInputs.length; j++){
              checkInputs[j].checked = this.checked;
            }
          }
          if(this.checked == false){
            for(let k = 0;k < checkAll.length;k++){
              checkAll[k].checked = false;
            }
          }
          getTotal()
        }
      }

      for(let i = 0; i < uls.length;i++){
        uls[i].onclick = function(e){
          e = e || window.event;
          const el = e.srcElement;
          const cls = el.className;
          const input = this.getElementsByClassName('Quantity-input')[0];
          const less = this.getElementsByClassName('less')[0];
          const val = parseInt(input.value);
          const that = this;
          switch(cls){
            case 'add layui-btn':
              input.value = val + 1;
              getSubTotal(this);
              break;
            case 'less layui-btn':
              if(val > 1){
                input.value = val - 1;
              }
              getSubTotal(this);
              break;
            case 'dele-btn':
              layer.confirm('你确定要删除吗',{
                yes:function(index,layero){
                  layer.close(index);
                  that.parentNode.removeChild(that);
                }
              });
              break;
          }
          getTotal()
        }
      }
      batchdeletion.onclick = function(){
        if(SelectedPieces.innerHTML != 0){
          layer.confirm('你确定要删除吗',{
            yes:function(index,layero){
              layer.close(index);
              for(let i = 0;i < uls.length;i++){
                const input = uls[i].getElementsByTagName('input')[0];
                if(input.checked){
                  uls[i].parentNode.removeChild(uls[i]); 
                  i--;
                }
              }
              getTotal() 
            }

          })
        }else{
          layer.msg('请选择商品')
        }
        
      };
        checkAll[0].checked = true;
        checkAll[0].onclick();
  	  }  	

  };


  exports('car',car)
}); 