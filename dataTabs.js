/**
 *  Sustituir al idTabs...
 *
 *  La estructura en este deberá ser:
 *  (Ejemplo menú)
 *  
 *  <div id="tabs-keyname">
 *           <ul class="super">
 *            <li><a href="#">Titulo</a></li>
 *         </ul>
 *       
 *        <div class="item">
 *            <ul class="subitems">
 *                <li>           
 *                    <a href="">
 *                        <span class="title">Titulo</span>
 *                    </a>
 *                </li>
 *            </ul>
 *        </div>
 *
 *        <div class="itemexpand">
 *            <a href="">Blá</a>
 *        </div>   
 *    </div>
 * 
 * 
 * 
 * 
 *  @guilty Marcos Mansilla
 *  @version 2015
 * 
 *  @changelog:
 *  - Enero. Quedó funcionando
 *  - Febrero. Se agregó posibilidad de un ingreso de hermano de "item". Para por ejemplo entrar directamente en un link.
 *  - Mayo. Quité el attr que hacía que el href cambiara su nombre... Cambié también, estructura. (Semana 1)
 */

(function($){
    $.fn.dataTabs=function(){
        var $baseSelector = $(this);
       
        $(function () {
            $baseSelector.find("ul.super li a").each(function (index) {          
                $(this).attr("data-index", "data" + index.toString());
                if (index==0) $(this).parent().addClass("selected");
            });
            $baseSelector.find("div.item").each(function (index) {
                $(this).attr("data-index", "data" + index.toString());
                if (index>0) $(this).hide();
            });
            $baseSelector.find("div.itemexpand").each(function (index) {
                $(this).attr("data-index", "data" + index.toString());
                if (index>0) $(this).hide();
            });
            if (getCookie("index_").length) {
                $baseSelector.find("ul.super li").removeClass("selected");
                $baseSelector.children("div").hide();
               
                $baseSelector.find('*[data-index='+getCookie("index_")+']').parent().addClass("selected");
                $baseSelector.find('*[data-index='+getCookie("index_")+']').each(function() {
                    $(this).show();
                });
            }
        });
       
        $baseSelector.on("click", "ul.super li a", function(e){
            e.preventDefault();
            var thisData = $(e.target).data("index");
           
            if (!($(e.target).parent().hasClass("selected"))) {
                $baseSelector.children("div").hide();
                $baseSelector.find('*[data-index='+thisData+']').each(function() {
                    $(this).fadeIn('fast');
                    setindexCookie(thisData);
                });
            }
            $baseSelector.find("ul.super li").removeClass("selected");
            $(e.target).parent().addClass("selected");
        });
       
        function setindexCookie(index) {
            document.cookie="index_"+$baseSelector.attr('id')+"="+index;
        }
       
        function getCookie(key) {
            var name = key + $baseSelector.attr('id')+"=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }
    };
})(jQuery);