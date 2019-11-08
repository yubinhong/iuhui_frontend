const commodity_api = "http://api.iuhui.site/commodity/";
function renderpage(count,curr,limit,search){
    const laypage = layui.laypage,mm = layui.mm;
    const demo = document.getElementById('demo');
    const html = demo.innerHTML;
    const listCont = document.getElementById('list-cont');
    laypage.render({
        elem: 'demo0'
        ,count: count
        ,limit: limit
        ,curr: curr
        ,limits: [40,60,80]
        ,layout: ['count', 'prev', 'page', 'next', 'limit']
        ,jump: function(obj, first){
            if(!first){
                mm.request({
                    url: commodity_api,
                    method: 'post',
                    data: {limit:obj.limit, page:obj.curr, search: search},
                    success : function(res){
                        listCont.innerHTML = mm.renderHtml(html,res)
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            }

        }
    });
}
layui.config({
    base: '/res/static/js/util/' //你存放新模块的目录，注意，不是layui的模块目录
}).use(['mm','laypage','jquery', 'form'],function(){
    const laypage = layui.laypage, $ = layui.$, mm = layui.mm, form = layui.form;

    //模版引擎导入
    const demo = document.getElementById('demo');
    const html = demo.innerHTML;
    const listCont = document.getElementById('list-cont');
    form.on('submit(formDemo)', function(search_data){
        mm.request({
            url: commodity_api,
            method: 'post',
            data: {'search':search_data.field.title},
            success : function(res){
                listCont.innerHTML = mm.renderHtml(html,res);
                renderpage(res.count,res.page,res.limit,search_data.field.title);
            },
            error: function(res){
                console.log(res);
            }
        });
        return false;
    });

    mm.request({
        url: commodity_api,
        method: 'post',
        success : function(res){
            listCont.innerHTML = mm.renderHtml(html,res);
            renderpage(res.count,res.page,res.limit,'');

        },
        error: function(res){
            console.log(res);
        }
    });

    $('.list-box dt a').on('click',function(){
        $(this).addClass('active').parent().siblings('dt a.active').removeClass('active');
    })

});