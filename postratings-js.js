/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function(a){a.fn.appear=function(b,c){var d=a.extend({data:undefined,one:!0,accX
:0,accY:0},c);return this.each(function(){var c=a(this);c.appeared=!1;if(!b){c.trigger
("appear",d.data);return}var e=a(window),f=function(){if(!c.is(":visible")){c.appeared=!1
;return}var a=e.scrollLeft(),b=e.scrollTop(),f=c.offset(),g=f.left,h=f.top,i=d.accX
,j=d.accY,k=c.height(),l=e.height(),m=c.width(),n=e.width();h+k+j>=b&&h<=b+l+j&&g+
m+i>=a&&g<=a+n+i?c.appeared||c.trigger("appear",d.data):c.appeared=!1},g=function(
){c.appeared=!0;if(d.one){e.unbind("scroll",f);var g=a.inArray(f,a.fn.appear.checks
);g>=0&&a.fn.appear.checks.splice(g,1)}b.apply(this,arguments)};d.one?c.one("appear"
,d.data,g):c.bind("appear",d.data,g),e.scroll(f),a.fn.appear.checks.push(f),f()})
},a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var b=a.fn.appear
.checks.length;if(b>0)while(b--)a.fn.appear.checks[b]()},run:function(){a.fn.appear
.timeout&&clearTimeout(a.fn.appear.timeout),a.fn.appear.timeout=setTimeout(a.fn.appear
.checkAll,20)}}),a.each(["append","prepend","after","before","attr","removeAttr","addClass"
,"removeClass","toggleClass","remove","css","show","hide"],function(b,c){var d=a.
fn[c];d&&(a.fn[c]=function(){var b=d.apply(this,arguments);return a.fn.appear.run
(),b})})})(jQuery)
/*
+----------------------------------------------------------------+
|																							|
|	WordPress Plugin: WP-PostRatings								|
|	Copyright (c) 2012 Lester "GaMerZ" Chan									|
|																							|
|	File Written By:																	|
|	- Lester "GaMerZ" Chan															|
|	- http://lesterchan.net															|
|																							|
|	File Information:																	|
|	- Post Ratings Javascript File													|
|	- wp-content/plugins/wp-postratings/postratings-js.php				|
|																							|
+----------------------------------------------------------------+
*/


// Variables
var post_id = 0;
var post_rating = 0;
var is_being_rated = false;
ratingsL10n.custom = parseInt(ratingsL10n.custom);
ratingsL10n.max = parseInt(ratingsL10n.max);
ratingsL10n.show_loading = parseInt(ratingsL10n.show_loading);
ratingsL10n.show_fading = parseInt(ratingsL10n.show_fading);

// When User Mouse Over Ratings
function current_rating(id, rating, rating_text) {
	if(!is_being_rated) {
		post_id = id;
		post_rating = rating;
		if(ratingsL10n.custom && ratingsL10n.max == 2) {
			jQuery('#rating_' + post_id + '_' + rating).attr('src', eval('ratings_' + rating + '_mouseover_image.src'));
		} else {
			for(i = 1; i <= rating; i++) {
				if(ratingsL10n.custom) {
					jQuery('#rating_' + post_id + '_' + i).attr('src', eval('ratings_' + i + '_mouseover_image.src'));
				} else {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratings_mouseover_image.src);
				}
			}
		}
		if(jQuery('#ratings_' + post_id + '_text').length) {
			jQuery('#ratings_' + post_id + '_text').show();
			jQuery('#ratings_' + post_id + '_text').html(rating_text);
		}
	}
}


// When User Mouse Out Ratings
function ratings_off(rating_score, insert_half, half_rtl) {
	if(!is_being_rated) {
		for(i = 1; i <= ratingsL10n.max; i++) {
			if(i <= rating_score) {
				if(ratingsL10n.custom) {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_' + i + '_on.' + ratingsL10n.image_ext);
				} else {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_on.' + ratingsL10n.image_ext);
				}
			} else if(i == insert_half) {
				if(ratingsL10n.custom) {
					jQuery('#rating_' + post_id + '_' + i).attr('src',  ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_' + i + '_half' + (half_rtl ? '-rtl' : '') + '.' + ratingsL10n.image_ext);
				} else {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_half' + (half_rtl ? '-rtl' : '') + '.' + ratingsL10n.image_ext);
				}
			} else {
				if(ratingsL10n.custom) {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_' + i + '_off.' + ratingsL10n.image_ext);
				} else {
					jQuery('#rating_' + post_id + '_' + i).attr('src', ratingsL10n.plugin_url + '/images/' + ratingsL10n.image + '/rating_off.' + ratingsL10n.image_ext);
				}
			}
		}
		if(jQuery('#ratings_' + post_id + '_text').length) {
			jQuery('#ratings_' + post_id + '_text').hide();
			jQuery('#ratings_' + post_id + '_text').empty();
		}
	}
}

// Set is_being_rated Status
function set_is_being_rated(rated_status) {
	is_being_rated = rated_status;
}

// Process Post Ratings Success
function rate_post_success(data) {
	jQuery('#post-ratings-' + post_id).html(data);
	if(ratingsL10n.show_loading) {
		jQuery('#post-ratings-' + post_id + '-loading').hide();
	}
	if(ratingsL10n.show_fading) {
		jQuery('#post-ratings-' + post_id).fadeTo('def', 1, function () {
			set_is_being_rated(false);	
		});
	} else {
		set_is_being_rated(false);	
	}
}

// Process Post Ratings
function rate_post() {
	post_ratings_el = jQuery('#post-ratings-' + post_id);
	if(!is_being_rated) {
		post_ratings_nonce = jQuery(post_ratings_el).data('nonce');
		if(typeof post_ratings_nonce == 'undefined' || post_ratings_nonce == null)
			post_ratings_nonce = jQuery(post_ratings_el).attr('data-nonce');
		set_is_being_rated(true);
		if(ratingsL10n.show_fading) {
			jQuery(post_ratings_el).fadeTo('def', 0, function () {
				if(ratingsL10n.show_loading) {
					jQuery('#post-ratings-' + post_id + '-loading').show();
				}
				jQuery.ajax({
					type: 'GET', 
					url: ratingsL10n.ajax_url, 
					data: 'action=postratings&pid=' + post_id + '&rate=' + post_rating + '&postratings_' + post_id + '_nonce=' + post_ratings_nonce, 
					cache: 
					false, success: rate_post_success});
			});
		} else {
			if(ratingsL10n.show_loading) {
				jQuery('#post-ratings-' + post_id + '-loading').show();
			}
			jQuery.ajax({type: 'GET', url: ratingsL10n.ajax_url, data: 'action=postratings&pid=' + post_id + '&rate=' + post_rating + '&postratings_' + post_id + '_nonce=' + post_ratings_nonce, cache: false, success: rate_post_success});
		}
	} else {
		alert(ratingsL10n.text_wait);
	}
}

jQuery(document).ready(function($) {
	$('.post-ratings').appear(function() {
		var $elm = $(this),
			post_ratings_nonce = $elm.data('nonce'),
			post_id = $elm.attr('id').split('-')[2];
		if(typeof post_ratings_nonce == 'undefined' || post_ratings_nonce == null)
			post_ratings_nonce = $elm.attr('data-nonce');

		$.ajax({
			type: 'GET', 
			url: ratingsL10n.ajax_url, 
			data: 'action=getpostratings&pid=' + post_id, 
			success: function(data) {
				$elm.html(data);
			}
		});
	});
});




