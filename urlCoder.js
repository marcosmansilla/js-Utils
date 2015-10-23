/**
 *  Un plugin propio para codificar, o decodificar los valores para ser enviados por URL.
 *
 *
 *  @param $ El valor a procesar
 *  @param action: Puede ser encode o decode.
 * 
 *  $("input.clasevalor").urlCoder("encode");
 * 
 * 
 *  @guilty Marcos Mansilla
 *  @version 2015
 * 
 *   @changelog:
 *  - Mayo. Primera Versión
 * 
 * 
 */
(function($){
    $.fn.urlCoder = function(action){
        var value = $(this).val();
        if (action === 'encode') {
            encode();
        } else decode();

        function encode() {
            var unencoded = value;
            value = encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");
        }

        function decode() {
            var encoded = value;
            value = decodeURIComponent(encoded.replace(/\+/g, " "));
        }
        return value;
    };
})(jQuery);