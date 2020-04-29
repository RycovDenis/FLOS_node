function isset(e,tt,tt1){
    /**
     * created by Nyko13 (ug developer team) 10.04.2013.
     *
     * e:       element for test
     * tt,tt1:  ['string'] - check for empty string.
     *              return: if string isset but is empty - return false
     *          ['array'] - check for empty array.
     *              return: if array isset but is empty - return false
     *
     * function return: true - if isset
     *                  false - if not isset
     *                  0 - if can`t check
     *
     * usage note:
     *	for check jQuery element like $('div'), need use param 'array'.
     *	parameters after 'e' can be administered in any order (isset(e,'string'); isset(e,'array'); isset(e,'string','array'); - all this work fine)
     */
    var t = [];
    if(typeof tt != 'undefined'){
        t[t.length] = tt;
    }
    if(typeof tt1 != 'undefined'){
        t[t.length] = tt1;
    }
    var types = ['boolean','string','object','number'];
    var type = typeof e;

    if(type !== 'undefined' && e != null){
        for(var i=0;i<types.length;i++){
            if(types[i]===type){
                if(t.length>0){
                    for(var j=0;j<t.length;j++){
                        if(e.length<=0
                            && ((type === 'string' && t[j] == 'string')
                                || (type === 'object' && t[j] == 'array'))){
                            return false;
                        }
                    }
                }
                return true;
            }
        }
    }else{
        return false;
    }
    return 0;
}