/*!
 * Copyright (c) 2015 Ariel Flesler - aflesler ○ gmail • com
 * Licensed under MIT
 * https://github.com/flesler/idonethis-form
 * @projectDescription Very simple mobile-friendly HTML form to submit a done to IDoneThis
 * @author Ariel Flesler
 * @version 1.0.1
 */
(function() {

	var qs = {};
	location.search.slice(1).split('&').forEach(function(param) {
		var p = param.split('=').map(decodeURIComponent);
		qs[p[0]] = p[1];
	});

	// Redirect to empty params so they can see what is expected of them
	if (!('token' in qs) || !('team' in qs)) {
		location.search = 'team=&token=';
		return;
	}

	if (!qs.token) $('#token-err').show();
	if (!qs.team) $('#team-err').show();

	var ok = $('.alert-success');
	// Some fields are missing, cannot allow edition
	if (!qs.token || !qs.team) {
		return disabled(true);
	}
	
	var input = $('input');
	$('form').on('submit', function(e) {
		e.preventDefault();
		
		var done = $.trim(input.val());
		if (done)  {
			disabled(true);
			submit(this, done);
		} else {
			input.focus();
		}
	});

	function submit(form, done) {
		$('.alert-danger').remove();
		ok.stop(true).fadeOut();

		$.ajax({
			type: form.method,
			url: form.action,
			headers: {
				Authorization: 'Token '+qs.token
			},
			data: {
				raw_text: done,
				team: qs.team
			},
			complete: function(xhr) {
				try {
					var data = JSON.parse(xhr.responseText);
					if (data.ok) {
						ok.stop(true).fadeIn('slow')
							.find('a').attr('href', data.result.permalink);
						form.reset();
					} else {
						showError(data.detail);
					}				
				} catch (err) {
					showError(err.message);
				}
				disabled(false);
				input.focus();
			}
		});
	}

	function showError(msg) {
		$('<div>')
			.addClass('alert alert-danger').text(msg)
			.appendTo('#alerts').fadeIn('slow')
			.animate({a:1}, 5000)
			.fadeOut('slow', function() {
				$(this).remove();
			});
	}

	function disabled(state) {
		$('form *').attr('disabled', state);
	}

})();
