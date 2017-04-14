//<script>
(function(){
	var new_campaigns = {"50018":{"ad_shown":false,"pid":"50015","ctype":"campaign","activations":[{"activation":"bounce","prop":"","val":""},{"activation":"inactivity","prop":"","val":"300"}],"overlay":"genie","coverlay":"genie","ctop":"none","cbottom":"none","bottom":"none","callout":"none","callout_t":"","callout_pt":null,"callout_pos":"rm","header_bottom_alignment":"center","callout_anchor_pos":"lm","blur_gate_enabled":0,"blur_gate_inclusions":"","blur_gate_exclusions":"","dom_placement_method":"","callout_voffset":"0","callout_hoffset":"0","acas":0,"top":"none","overlay_teleport_html":"","overlay_teleport_type":"_blank","opacity":0.9,"color":"#000000","close_button_delay":25,"custom_tab_title":null,"show_close":1,"show_close_step":1,"close_redirect_url":"","close_redirect_type":"_self","activation_delay":5,"closed_no_show":0,"ipc":0,"mas":1,"mao":4,"map":1,"iao":"0","rao":"0","tvao":"0","is_ec":true,"is_api":true,"is_man":0,"ad_auto_close":0,"activation_offset":0,"header_top_nano":0,"header_bottom_nano":0,"shroud_on_hover":0,"type":"","ttype":"variation","hbna":"0","hbnbg":"0","htna":"0","htnbg":"1","ad_visible":false,"osfn":"window.print_coupon = function(){\n    document.body.style.zoom = 0.6;\n    window.print();\n    document.body.style.zoom = 1;\n    window.top.location.href = window.link;\n};\n\n\/\/change functions\n\n\/\/new\nwindow.update_new_makes = function(){\n    jQuery('#bouncex_el_25 select').empty();\n    jQuery('#bouncex_el_25 div:first').text('Select Make');\n    jQuery('#bouncex_el_26 select').empty();\n    jQuery('#bouncex_el_26 div:first').text('Select Model');\n    var year = jQuery('#bouncex_el_80 select').val();\n    window.populate('new', '25', 'make','year', year);\n};\n\nwindow.update_new_models = function(){\n    jQuery('#bouncex_el_26 select').empty();\n    jQuery('#bouncex_el_26 div:first').text('Select Model');\n    \/\/var year = jQuery('#bouncex_el_80 select').val();\n    var make = jQuery('#bouncex_el_25 select').val();\n    window.populate('new', '26', 'model','make', make);\n};\n\nwindow.update_new_car = function(){\n    jQuery('#picid').empty();\n    window.year = jQuery('#bouncex_el_80 select').val();\n    window.make = jQuery('#bouncex_el_25 select').val();\n    window.model = jQuery('#bouncex_el_26 select').val();\n    window.get_link('new');\n    window.picture('new');\n    window.get_averages();\n};\n\n\/\/used\nwindow.update_used_models = function(){\n    jQuery('#bouncex_el_134 select').empty();\n    jQuery('#bouncex_el_134 div:first').text('Select Model');\n    jQuery('#bouncex_el_83 select').empty();\n    jQuery('#bouncex_el_83 div:first').text('Select Year');\n    var make = jQuery('#bouncex_el_103 select').val();\n    window.populate('used', '134', 'model','make', make);\n};\n\nwindow.update_used_years = function(){\n    jQuery('#bouncex_el_83 select').empty();\n    jQuery('#bouncex_el_83 div:first').text('Select Year');\n    var model = jQuery('#bouncex_el_134 select').val();\n    window.populate('used', '83', 'year','model', model);\n};\n\nwindow.update_used_cars = function(){\n    for (var i=0;i<6;i++){ \n        jQuery('div[name=\\''+window.mileage_spot[i]+'_name\\']').empty();\n        jQuery('#picid'+(i+1)).empty();\n    }\n    window.used_pics = [];\n    window.year_u = jQuery('#bouncex_el_83 select').val();\n    window.make_u = jQuery('#bouncex_el_103 select').val();\n    window.model_u = jQuery('#bouncex_el_134 select').val();\n    window.get_link('used');\n    window.picture('used');\n};\n\n\/\/change listeners\njQuery('body').on('change','select',null,function(){\n    if(jQuery(this).attr('id') == '80_select'){\n        window.update_new_makes();\n    } else if(jQuery(this).attr('id') == '25_select'){\n        window.update_new_models();\n    } else if (jQuery(this).attr('id') == '26_select'){\n        window.update_new_car();\n    } else if (jQuery(this).attr('id') == '103_select'){\n        window.update_used_models();\n    } else if (jQuery(this).attr('id') == '134_select'){\n        window.update_used_years();\n    } else if (jQuery(this).attr('id') == '83_select'){\n        window.update_used_cars();\n    }\n});\n\n\/\/fix random listener bugs\nsetInterval(function(){\n    if(jQuery('#bouncex_el_26 select :first :first').length==0 && jQuery('#bouncex_el_25 select').val()){\n        window.update_new_models();\n    } else if(jQuery('#bouncex_el_83 select :first :first').length==0 && jQuery('#bouncex_el_134 select').val()){\n        window.update_used_years();\n    }\n},500);\n\n\n\/\/dynamically which site are we on?\nwindow.which_site = jQuery('div[name=\\'29_name\\']').text();\n\n\n\/\/get JSON feeds from backend\njQuery.ajax('\/capture\/custom_code\/dealeron',{type:'post',dataType:'json',data:{site:window.which_site,age:'used'},success:function(data){ window.json_u=data;}});\njQuery.ajax('\/capture\/custom_code\/dealeron',{type:'post',dataType:'json',data:{site:window.which_site,age:'new'},success:function(data){ window.json_n=data;}});\n\nwindow.get_new_test = function(){\n  jQuery.ajax('\/capture\/custom_code\/dealeron',{type:'post',dataType:'json',data:{site:window.which_site,age:'new'},success:function(data){ window.json_n=data;}});\n};\n\nwindow.get_used_test = function(){\n  jQuery.ajax('\/capture\/custom_code\/dealeron',{type:'post',dataType:'json',data:{site:window.which_site,age:'used'},success:function(data){ window.json_u=data;}});\n};\n\/\/get uniques from json feed\nwindow.find_uniques = function(json_array, thing, optthing, optval){\n    ary = [];\n    jQuery(json_array).each(function(){\n        if (optthing) {\n            if (this[optthing]==optval && $.inArray(this[thing],ary)<0){\n                ary.push(this[thing]);\n            }\n        }else if ($.inArray(this[thing],ary)<0){\n            ary.push(this[thing]);\n        }\n    });\n    ary.sort();\n    return ary;\n};\n\n\n\/\/make option tags from array \nwindow.make_options = function(ary, bx_num){\n    jQuery('#bouncex_el_'+bx_num+' select').empty();\n    jQuery(ary).each(function(){\n        jQuery('#bouncex_el_'+bx_num+' select').append('<option value=\\''+this+'\\'>'+this+'<\/option>');\n    });\n};\n\n\/\/put make options and find uniques together to populate dropdowns\nwindow.populate = function(type, d1num, thing, optthing, optval){\n    jQuery('#bouncex_el_'+ d1num + ' select').empty();\n    if (type == 'new' && !optthing) {\n        window.make_options(window.find_uniques(window.json_n, thing), d1num);\n    } else if (type == 'used' && !optthing) {\n        window.make_options(window.find_uniques(window.json_u, thing), d1num);\n    } else if (type == 'new' && optthing) {\n        window.make_options(window.find_uniques(window.json_n, thing, optthing, optval), d1num);\n    } else if (type == 'used' && optthing) {\n        window.make_options(window.find_uniques(window.json_u, thing, optthing, optval), d1num);\n    }\n};\n\njQuery('#picid').click(function(){window.submit('new');});\n\n\/\/create array of div selects for mileage population for used cars\nwindow.mileage_spot = ['69','71','184','37','38','39'];\n\nwindow.get_averages = function(){\n    window.highest_mpgc = 0;\n    window.lowest_mpgc = 500000000;\n    window.highest_mpgh = 0;\n    window.lowest_mpgh = 500000000;\n    window.highest_price = 0;\n    window.lowest_price = 5000000000;\n    jQuery(window.json_n).each(function(){\n        if (this.year == window.year && this.make == window.make && this.model == window.model){\n            if (this.cityMpg > window.highest_mpgc){window.highest_mpgc = this.cityMpg;}\n            if (this.cityMpg < window.lowest_mpgc){window.lowest_mpgc = this.cityMpg;}\n            if (this.highwayMpg > window.highest_mpgh){window.highest_mpgh = this.cityMpg;}\n            if (this.highwayMpg < window.lowest_mpgh){window.lowest_mpgh = this.cityMpg;}\n\n\n            if (this.InternetPrice > window.highest_price){window.highest_price = this.InternetPrice;}\n            if (this.InternetPrice < window.lowest_price && this.InternetPrice > 0){window.lowest_price = this.InternetPrice;}\n            if (window.lowest_price > 500000000) { window.lowest_price = 0;}\n            if (window.highest_price > 500000000) { window.highest_price = 0;}\n\n        }\n    });  \n    jQuery('#bouncex_el_40').empty();\n    jQuery('#bouncex_el_41').empty();\n\n    if (window.highest_mpgc == window.lowest_mpgc){window.mpgc_span = window.highest_mpgc;} else { window.mpgc_span = window.lowest_mpgc+' - '+window.highest_mpgc;}\n    if (window.highest_mpgh == window.lowest_mpgh){window.mpgh_span = window.highest_mpgh;} else { window.mpgh_span = window.lowest_mpgh+' - '+window.highest_mpgh;}\n    if (window.highest_price == window.lowest_price && window.highest_price != 0){window.price_span = '$'+window.highest_price.formatNumber(0);} else if(window.lowest_price == window.highest_price && window.lowest_price >0){ window.price_span = '$'+window.lowest_price.formatNumber(0)+' - '+'$'+window.highest_price.formatNumber(0);} else {window.price_span = 'Call For Price';}\n\n    if (window.highest_mpgh==500000000){\n        jQuery('#bouncex_el_40').append('<div class=\\'new_class\\'><span class=\\'mini_titles\\'>MPG City: <\/span><span>N\/A<\/span><br><br><span class = \\'mini_titles\\'>MPG Highway: <\/span><span>N\/A<\/span><\/div>');\n    } else {\n        jQuery('#bouncex_el_40').append('<div class=\\'new_class\\'><span class=\\'mini_titles\\'>MPG City: <\/span><span>'+window.mpgc_span+'<\/span><br><br><span class = \\'mini_titles\\'>MPG Highway: <\/span><span>'+window.mpgh_span+'<\/span><\/div>');\n    }\n    jQuery('#bouncex_el_41').append('<div class=\\'new_class\\'><span class=\\'mini_titles\\'>Price Range: <\/span><span>'+window.price_span+'<\/span><br><span class = \\'mini_titles\\'>Engine: <\/span><span>'+window.engine+'<\/span><br><span class = \\'mini_titles\\'>Transmission: <\/span><span>'+window.transmission+'<\/span><\/div>');};\n\n\/\/function to find and populate picture\nwindow.picture = function(type){\n    if (type == 'new'){\n        jQuery(window.json_n).each(function(){\n             if (this.year == window.year && this.make == window.make && this.model == window.model){\n\n                if (this.inventoryPhoto.indexOf('missingphoto')>=0) {\n                    jQuery('#picid').append('<img src =\\'https:\/\/bounceexchange.com\/assets\/uploads\/users\/382\/IOkoZCfi.png\\' style=\\'height:100%;width:100%;\\'>');\n                } else if(this.inventoryPhoto.slice(0,5)==='photo'){\n                     jQuery('#picid').append('<img src=\\'http:\/\/a.dlron.us\/'+this.inventoryPhoto +'\\' style=\\'height:100%;width:100%;\\' >');\n                } else {\n                    jQuery('#picid').append('<img src=\\'http:\/\/cdn.dealeron.com\/'+this.inventoryPhoto +'\\' style=\\'height:100%;width:100%;\\' >');\n                }\n                window.vin = this.vin;\n                window.engine = this.engine;\n                window.trans = this.transmission;\n                return false;\n            }          \n          });\n     } else if (type == 'used'){\n        window.used_pics = [];\n        jQuery(window.json_u).each(function(){\n            if (this.year == window.year_u && this.make == window.make_u && this.model == window.model_u && window.used_pics.length<6){\n                window.used_pics.push(this);\n            }\n        });\n        if (window.used_pics.length<6){\n            jQuery(window.json_u).each(function(){\n                if (this.make == window.make_u && this.model == window.model_u && $.inArray(this, window.used_pics)<0){\n                    window.used_pics.push(this);\n                }\n            });\n        }\n        if (window.used_pics.length<6){\n            jQuery(window.json_u).each(function(){\n                if (this.make == window.make_u && $.inArray(this, window.used_pics)<0){\n                    window.used_pics.push(this);\n                }\n            });\n        }\n        if (window.used_pics.length<6){\n            jQuery(window.json_u).each(function(){\n                if ($.inArray(this, window.used_pics)<0){\n                    window.used_pics.push(this);\n                }\n            });\n        }\n        for (var i=0;i<6;i++){\n            var car = window.used_pics[(i)];\n            if (car.inventoryPhoto.slice(0,5)==='photo'){\n                jQuery('#picid'+(i+1)).append('<img src=\\'http:\/\/a.dlron.us\/'+car.inventoryPhoto+'\\' style=\\'height:100%;width:100%;\\' id=\\'usedpic'+(i+1)+'\\' >');\n            } else {\n                jQuery('#picid'+(i+1)).append('<img src=\\'http:\/\/cdn.dealeron.com\/'+car.inventoryPhoto+'\\' style=\\'height:100%;width:100%;\\' id=\\'usedpic'+(i+1)+'\\' >');\n            }\n            if(car.InternetPrice > 0){window.used_price = '$'+car.InternetPrice.formatNumber(0);} else {window.used_price = 'unavailable';}\n            jQuery('div[name=\\''+window.mileage_spot[i]+'_name\\']').append('<span id=\\'mileage_style_1\\'>Price: <\/span><span id=\\'mileage_style_2\\'>'+window.used_price+'<\/span>');\n            jQuery('#picid'+(i+1)).append('<div id=\\'floater_'+(i+1)+'\\' style=\\'height100%;width:100%; z-index:1;top:6%;\\'><span id=\\'mileage_style_1\\'>Mileage: <\/span><span>'+car.mileage.formatNumber(0)+'<\/span><br><span id=\\'mileage_style_1\\'>MPG Highway: <\/span><span>'+car.highwayMpg+'<\/span><br><span id=\\'mileage_style_1\\'>MPG City: <\/span><span>'+car.cityMpg+'<br><span id=\\'mileage_style_1\\'>Ext. Color: <\/span><span>'+car.extColor_abbr+'<\/span><br><span id=\\'mileage_style_1\\'>Int. Color: <\/span><span>'+car.intColor);\n        }\n    }\n};\n\n\/\/used listeners\nwindow.id = 1;\nfor (var i=0;i<6;i++){ \n    jQuery('#picid'+(i+1)).click(function(){window.id=parseInt(jQuery(this).attr('id').match(\/\\d+\/));\/*window.submit('used');*\/jQuery('input[name=28_name]').click();});\n}\n\nwindow.get_link = function(type){\n    if (type == 'new'){\n        jQuery(window.json_n).each(function(){\n            if (this.year == window.year && this.make == window.make && this.model == window.model){\n               window.link = window.which_site+'\/vehicledetailsvin.aspx?vin='+this.vin;\n               return false;\n            }          \n        });\n     }\n};\n\nwindow.submit = function(type){\n    if (type === 'used'){\n        window.link = window.which_site + '\/vehicledetailsvin.aspx?vin=' + window.used_pics[(window.id-1)].vin +'&bx_coupon=1';\n    } else {\n        window.link = window.which_site + '\/vehicledetailsvin.aspx?vin=' + window.vin + '&bx_coupon=1';\n    }\n};\n\nwindow.used_submit = function(){\n    if(!window.link){\n        window.link = window.which_site + '\/vehicledetailsvin.aspx?vin=' + window.used_pics[0].vin +'&bx_coupon=1';\n    } \n};\n\n\/\/set hover to show details for used images\n\nfor(var i = 0; i < 6;i++){\n    (function(){\n         var div = 30 + i;\n         var adji = i+1;\n          jQuery('#bouncex_el_'+ div).hover(function(){\n              jQuery('#floater_'+ adji ).css('visibility','visible');\n              jQuery('#usedpic'+ adji ).css('opacity','0.1');\n          }, function(){\n              jQuery('#floater_'+ adji ).css('visibility','hidden');\n              jQuery('#usedpic'+ adji ).css('opacity','1');\n          });\n     })();\n}\n\nNumber.prototype.formatNumber = function(c, d, t){\nvar n = this, \n    c = isNaN(c = Math.abs(c)) ? 2 : c, \n    d = d == undefined ? '.' : d, \n    t = t == undefined ? ',' : t, \n    s = n < 0 ? '-' : '', \n    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '', \n    j = (j = i.length) > 3 ? j % 3 : 0;\n   return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(\/(\\d{3})(?=\\d)\/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');\n };\n\nwindow.prepop_new = function(){\n    \n    window.select_1_n = jQuery('#80_select :last-child').text();\n    jQuery('div[name=VehicleYear]:first').text(window.select_1_n);\n    jQuery('#80_hidden').val(window.select_1_n);\n    jQuery('#80_text_hidden').val(window.select_1_n);\n    jQuery('#80_select :last-child').prop('selected', true);\n    window.update_new_makes();\n\n    window.select_2_n = jQuery('#25_select :first-child').text();\n    jQuery('div[name=VehicleMake]:first').text(window.select_2_n);\n    jQuery('#25_hidden').val(window.select_2_n);\n    jQuery('#25_text_hidden').val(window.select_2_n);\n    jQuery('#25_select :first-child').prop('selected', true);\n    window.update_new_models();\n\n    window.select_3_n = jQuery('#26_select :first-child').text();\n    jQuery('div[name=VehicleModel]:first').text(window.select_3_n);\n    jQuery('#26_hidden').val(window.select_3_n);\n    jQuery('#26_text_hidden').val(window.select_3_n);\n    jQuery('#26_select :first-child').prop('selected', true);\n    window.update_new_car();\n\n};\n\n\nwindow.prepop_used = function(){\n    \n    jQuery('div[name=VehicleMake]:last').text(window.select_2_n);\n    jQuery('#103_hidden').val(window.select_2_n);\n    jQuery('#103_text_hidden').val(window.select_2_n);\n    jQuery('#103_select :contains('+window.select_2_n+')').prop('selected', true);\n    window.update_used_models();\n\n    window.select_2_u = jQuery('#134_select :first-child').text();\n    jQuery('div[name=VehicleModel]:last').text(window.select_2_u);\n    jQuery('#134_hidden').val(window.select_2_u);\n    jQuery('#134_text_hidden').val(window.select_2_u);\n    jQuery('#134_select :first-child').prop('selected', true);\n    window.update_used_years();\n\n    window.select_3_u = jQuery('#83_select :last-child').text();\n    jQuery('div[name=VehicleYear]:last').text(window.select_3_u);\n    jQuery('#83_hidden').val(window.select_3_u);\n    jQuery('#83_text_hidden').val(window.select_3_u);\n    jQuery('#83_select :last-child').prop('selected', true);\n    window.update_used_cars();\n};\n\nwindow.used_to_new = function(){\n    window.populate('new', '80', 'year');\n    window.get_link('new');\n};\n\nwindow.new_to_used = function(){\n    window.populate('used', '103', 'make');\n    window.prepop_used();\n    window.link = '';\n};\n\n\/\/set used step to not be last step.\njQuery('#step_3 [name=last_step]').val(0);\n\n\n","tes":"1","te":"r3dsign","te2":"no_effect","t_valign":"top","b_valign":"bottom","qbxtest":false,"submission_redirect":"","submission_redirect_delay":2,"osfn_website":"","supress_overlay":0,"repress_overlay":0,"supress_top":0,"repress_top":0,"supress_bottom":0,"repress_bottom":0,"ng":0,"images":[],"edw":0,"event_js":"{\"activation\":\"\",\"impression\":\"bouncex.report_ga('impression','eCap  BTS  New Vehicle VDP 300 OFF');\\n\",\"click\":\"bouncex.report_ga('click','eCap  BTS  New Vehicle VDP 300 OFF');\\n\",\"submission\":\"bouncex.report_ga('submission','eCap  BTS  New Vehicle VDP 300 OFF');\\n\",\"close\":\"\"}","ga_i":[],"noCreative":false,"gbi":false,"control":false,"html":"<style type=\"text\/css\">#mileage_style_1{font-weight:bolder;}#mileage_style_1, #mileage_style_2 {font-size: 1.25vw;}div[name='69_name'],div[name='71_name'],div[name='184_name'],div[name='37_name'],div[name='38_name'],div[name='39_name']{text-align:center;}#bouncex_el_40, #bouncex_el_41 {font-size:1.25vw;max-width:245px;}#picid, #picid1, #picid2, #picid3, #picid4, #picid5, #picid6 {height:100%;width:100%;}#usedpic1,#usedpic2,#usedpic3,#usedpic4,#usedpic5,#usedpic6 {z-index:2;}#floater_1,#floater_2,#floater_3,#floater_4,#floater_5,#floater_6{position:absolute;top:25px;text-align:center;visibility:hidden;color:white;font-size:1vw}.new_class{position:absolute;top:15px;text-align:center;width:100%;height:100%;}.mini_titles{font-weight:bolder;}#bouncex_el_29{visibility:hidden;}#bcx_close_50018_overlay {top: 16px!important;right: 72px!important; }<\/style><div data-type=\"overlay\" data-valign=\"middle\" class=\"bcx_container bcx_overlay\" id=\"campaign_50018_container_overlay\" style=\"display:none;\"><div id=\"campaign_50018_lightbox\"  class=\"bouncex_lightbox\" ><\/div><div id=\"campaign_50018_middle\" class=\"bouncex_middle bcx_outer\" style=\"margin-left:-674px;margin-top:-345px;width:1348px;height:690px;\"><div  class=\"bcx_inner\" style=\"width:1348px;height:690px;\"><a target=\"_top\" id=\"bcx_close_50018_overlay\" class=\"bouncex_close bcx_close_overlay size_75  top_right   bcx_close_\" href=\"javascript:close_bouncex_ad(50018);\"><span>Close<\/span><\/a><iframe style=\"display:block !important\" name=\"bcx_50018_iframe_overlay\" id=\"bcx_50018_iframe_overlay\" horizontalscrolling=\"no\" verticalscrolling=\"no\" width=\"100%\" height=\"100%\" frameborder=\"0\" vspace=\"0\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" allowTransparency=\"true\" target=\"_parent\" src=\"http:\/\/api.bounceexchange.com\/bounce\/iframe_campaign\/50018?mode=0&website_id=854&device_type=d&pvid=9&visit_id=1488745671465402&device_id=6176381626721011190&height=841&w=1348px&h=690px&width=1662&campaign_id=50018&cvt=1488745671&fsa=0&scale=1&pos=overlay&vars%5Btrd-yr%5D=none&vars%5Btrd-mlge%5D=none&vars%5Bmagic%5D=%2F%2FDH&vars%5Bmagic_run%5D=1&vars%5Baddress%5D=13000+E+Independence+Blvd&vars%5Bdealer_city%5D=Matthews&vars%5Bdealer_name%5D=Scott+Clark+Toyota&vars%5Bdealer_id%5D=4974&vars%5Bga_code%5D=28635460-2&vars%5Bnew_disclaimer%5D=This+certificate+is+%24300+off+MSRP.+Certificate+is+valid+only+with+the+purchase+of+a+New+vehicle.+Certificate+is+not+valid+unless+presented+to+and+signed+by+our+Internet+Sales+Manager%2C+upon+arrival+at+the+dealership.+One+per+customer.+Cannot+be+combined+with+any+other+advertised+price%2C+promotion%2C+discount+or+coupon.+Coupon+must+be+presented+prior+to+negotiation.+Certificate+is+not+valid+on+any+price+quotes+that+were+given+prior+to+the+receipt+of+this+certificate.+Excludes+tax%2C+tags%2C+title%2C+registration+and+%24699+Dealer+documentation+fee.+Ex.+JTMWFREV6HJ121218+2017Rav4+XLE+FWD+Red+MSRP+%28%2429%2C980%29.&vars%5Bparts_disclaimer%5D=%2AExcludes+Tires.+Not+valid+with+any+other+coupons+or+discounts.&vars%5Bphone%5D=Call+Toll+Free%3A+855-314-6444&vars%5Bservice_disclaimer%5D=%2AExcludes+Tires.+Not+valid+with+any+other+coupons+or+discounts.&vars%5Bdealer_state%5D=NC&vars%5Btrade_disclaimer%5D=This+certificate+is+%24300+off+MSRP.+Certificate+is+valid+only+with+the+purchase+of+a+New+%26+Used+vehicle.+Certificate+is+not+valid+unless+presented+to+and+signed+by+our+Internet+Sales+Manager%2C+upon+arrival+at+the+dealership.+One+per+customer.+Cannot+be+combined+with+any+other+advertised+price%2C+promotion%2C+discount+or+coupon.+Coupon+must+be+presented+prior+to+negotiation.+Certificate+is+not+valid+on+any+price+quotes+that+were+given+prior+to+the+receipt+of+this+certificate.+Excludes+tax%2C+tags%2C+title%2C+registration+and+%24699+Dealer+documentation+fee.+Ex.+JTMWFREV6HJ121218+2017Rav4XLE+Red+MSRP+%2429%2C980.&vars%5Bused_disclaimer%5D=This+certificate+is+%24300+off+MSRP.+This+certificate+is+valid+only+with+the+purchase+of+a+used+vehicle.+This+certificate+is+not+valid+unless+presented+to+and+signed+by+our+Internet+Sales+Manager%2C+upon+arrival+at+the+dealership.+Limit+one+per+customer.+Cannot+be+combined+with+any+other+advertised+price%2C+promotion%2C+discount+or+coupon.+Coupon+must+be+presented+prior+to+negotiation.+Certificate+is+not+valid+on+any+price+quotes+that+were+given+prior+to+the+receipt+of+this+certificate.+Excludes+tax%2C+tags%2C+title%2C+and+registration.+%24699+Dealer+documentation+fee+applies.&vars%5Bdealer_zip%5D=28105&vars%5Bnew_json%5D=http%3A%2F%2Fwww.scottclarkstoyota.com%2Fapi%2Finventory%2Fget%2Fnew&vars%5Bused_json%5D=http%3A%2F%2Fwww.scottclarkstoyota.com%2Fapi%2Finventory%2Fget%2Fused&vars%5Bwhich_site%5D=http%3A%2F%2Fwww.scottclarkstoyota.com&vars%5Bdomain_name%5D=www.scottclarkstoyota.com&vars%5Bactive_campaigns%5D=50000+50015+50020+52239&vars%5Bused_page%5D=false&vars%5Bnew_page%5D=true&vars%5Bcurrent_url%5D=http%3A%2F%2Fwww.scottclarkstoyota.com%2Fnew-Matthews-2017-Toyota-Highlander-LE%2BPlus-5TDZZRFH3HS193168&vars%5Bgeneral_disclaimer%5D=This+certificate+is+%24300+off+MSRP.+This+certificate+is+valid+only+with+the+purchase+of+a+New+Vehicle.+This+certificate+is+not+valid+unless+presented+to+and+signed+by+our+Internet+Sales+Manager%2C+upon+arrival+at+the+dealership.+Limit+one+per+customer.+Cannot+be+combined+with+any+other+advertised+price%2C+promotion%2C+discount+or+coupon.+Coupon+must+be+presented+prior+to+negotiation.+Certificate+is+not+valid+on+any+price+quotes+that+were+given+prior+to+the+receipt+of+this+certificate.+Excludes+tax%2C+tags%2C+title%2C+and+registration.+%24699+Dealer+documentation+fee+applies.&vars%5Bdlrn_client_id%5D=0&vars%5Bdlrn_visit_id%5D=0&vars%5Bent_disc%5D=&vars%5Bent_head%5D=&vars%5Bent_sub_head%5D=&vars%5Bdlrn_url_cke%5D=+DLRON_URL_TRACKER%3DentryUrl%3Dhttp%3A%2F%2Fwww.scottclarkstoyota.com%2F%7Creferrer%3D&vars%5Bdlrn_cmp_cke%5D=&vars%5Bbmw%5D=false&vars%5Bactive_children%5D=50005%2C50018%2C50023%2C52244\"><\/iframe><\/div><\/div><\/div>","styles":""}};
	bouncex.brandStyles = false;
	bouncex.webfonts = false;
	bouncex.gbi.stacks = false
	
	var campaign_added = false;
	for(var ca_id in new_campaigns){
		if(new_campaigns.hasOwnProperty(ca_id)){
			if(!bouncex.cookie.campaigns){
				bouncex.cookie.campaigns = {};
			}
			if(!bouncex.cookie.campaigns[ca_id]){
				campaign_added = true;
				bouncex.cookie.campaigns[ca_id] = {lvt:bouncex.cookie.lvt, vv:0};
			}
		}
	}
	if(campaign_added){
		bouncex.setBounceCookie();
	}
	
	for(var ca_id in bouncex.campaigns){
		if(bouncex.campaigns.hasOwnProperty(ca_id)){//copy state vars
			if(new_campaigns[ca_id]){
				new_campaigns[ca_id].ap = bouncex.campaigns[ca_id].ap;
				new_campaigns[ca_id].repressed = Boolean(bouncex.campaigns[ca_id].repressed);
			}
			if(new_campaigns[ca_id]&&
				bouncex.campaigns[ca_id].ad_visible&&
				new_campaigns[ca_id].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')==bouncex.campaigns[ca_id].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')){
								new_campaigns[ca_id] = bouncex.campaigns[ca_id];

			}else{
				bouncex.destroy_ad(ca_id);
			}
		}
	}

	bouncex.campaigns = new_campaigns;
	new_campaigns = {};
	
	bouncex.debug = false;
		bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		bouncex.loadBounceCss(bouncex.initActivationFuncs);
		for (var ca_id in bouncex.campaigns) {
			if (bouncex.campaigns[ca_id].ad_visible && typeof bouncex.repressCampaigns === 'function') {
				bouncex.repressCampaigns(ca_id);
			}
		}
	}
		bouncex.loadBrandStyles();
	bouncex.loadWebfonts();

	}());
