/*!
 * Copyright (c) 2015 Ariel Flesler - aflesler ○ gmail • com
 * Licensed under MIT
 * https://github.com/flesler/idonethis-form
 * @projectDescription Very simple mobile-friendly HTML form to submit a done to IDoneThis
 * @author Ariel Flesler
 * @version 1.1.0
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

		var data = { raw_text: done, team: qs.team };
		if (qs.day_start) {
			// Done's submitted before `day_start` are added to the previous day
			var start = parseInt(qs.day_start, 10);
			var date = new Date(Date.now() - start * 3600000);
			data.done_date = [date.getFullYear(), date.getMonth()+1, date.getDate()].map(pad).join('-');
		}

		$.ajax({
			type: form.method,
			url: form.action,
			headers: {
				Authorization: 'Token '+qs.token
			},
			data: data,
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

	function pad(n) {
		return n <= 9 ? '0'+n : n;
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
