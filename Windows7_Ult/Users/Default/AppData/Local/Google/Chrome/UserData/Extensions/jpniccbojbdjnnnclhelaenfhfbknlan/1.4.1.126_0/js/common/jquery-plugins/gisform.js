(function($) {
    /**
     * Push2dial PIN inputs behavior plugin
     */
    $.fn.gisForm = function() {
        $(this).each(function() {
            var $this = $(this);
            var $formInputs = $this.find('input[type="text"], input[type="submit"], input[type="button"]');
            var $formTextInputs = $this.find('input[type="text"]');


			$formTextInputs
                .on('keypress', function(e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    var allow = false;

                    // allow key numbers, 0 to 9
                    if ((code >= 48 && code <= 57) || $.inArray(code, [8, 9 , 13, 46, 37, 39]) !== -1) {
                        allow = true;
                    }
                    if (!allow) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    // only 1 char
                    if (code >= 48 && code <= 57) {
                        if ($(this).val().length > 0) {
                            $(this).val('');
                        }
                    }
                    $(this).next('input[type="text"]').focus();
                });

            if ($formInputs.length > 1) {
                $formInputs.last().keydown(function(e) {
                    if (e.keyCode === 9 && !e.shiftKey) {
                        $formInputs.first().focus();
                        return false;
                    }
                });

                $formInputs.first().keydown(function(e) {
                    if (e.keyCode === 9 && e.shiftKey) {
                        $formInputs.last().focus();
                        return false;
                    }
                });
            }
        });
    };
})(DGExt.$);