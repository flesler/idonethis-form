/*!
 * Copyright (c) 2015 Ariel Flesler - aflesler ○ gmail • com
 * Licensed under MIT
 * https://github.com/flesler/idonethis-form/
 * @projectDescription Very simple mobile-friendly HTML form to submit a done to IDoneThis
 * @author Ariel Flesler
 * @version 1.2.0
 */
(function() {

	var qs = {};
	location.search.slice(1).split('&').forEach(function(param) {
		var p = param.split('=').map(decodeURIComponent);
		qs[p[0]] = p[1];
	});

	// Redirect to empty params so they can see what is expected of them
	if (!('token' in qs)) {
		location.search = 'teams=&token=&day_start=0';
		return;
	}

	if (!qs.token) $('#token-err').show();
	if (!qs.teams) $('#team-err').show();

	// Some fields are missing, cannot allow edition
	if (!qs.token || !qs.teams) {
		return disabled(true);
	}

	// Done's submitted before `day_start` are added to the previous day
	var dayStart = parseInt(qs.day_start, 10);
	if (dayStart) {
		$('#day-info').html(
			$('#day-info').html().replace('{HOUR}', pad(dayStart))
		).show();
	} else {
		$('#suggest-info').show();
	}

	var teams = qs.teams.split(',');
	if (teams.length > 1) {
		teams.forEach(function(team, i) {
			var radio = $('<input>').attr({type:'radio', name:'team', value:team});
			if (!i) radio.attr('checked', true);
			var link = $('<a>').text(' '+team).attr({
				target:'_blank',
				href:'https://idonethis.com/cal/'+team+'/'
			});

			$('<label>')
				.append(radio)
				.append(link)
				.appendTo('#teams');
		});
	}
	
	var input = $('#done');
	$('form').on('submit', function(e) {
		e.preventDefault();
		
		var done = $.trim(input.val());
		if (done)  {
			submit(this, done);
		} else {
			input.focus();
		}
	});

	// Auto (re)focus the input if the user starts typing
	$('body').keydown(function(e) {
		// TAB switches between teams
		var l = teams.length;
		if (e.keyCode === 9 && l > 1) {
			e.preventDefault();
			var dir = e.shiftKey ? -1 : 1;
			var next = teams.indexOf(getTeam()) + dir;
			$('#teams input').eq((next+l) % l).click();
		}
		input.focus();
	});

	function submit(form, done) {
		disabled(true);
		$('.alert').stop(true).hide();
		$('#done-pending').fadeIn();

		var data = { raw_text: done, team: getTeam() };
		if (dayStart) {
			// Send a done_date instead of relying on IDoneThis' default
			var date = new Date(Date.now() - dayStart * 3600000);
			data.done_date = [date.getFullYear(), date.getMonth()+1, date.getDate()].map(pad).join('-');
		}

		$.ajax({
			type: form.method,
			url: form.action,
			headers: { Authorization: 'Token '+qs.token },
			data: data,
			complete: function(xhr, textStatus) {
				try {
					var data = JSON.parse(xhr.responseText);
					if (data.ok) {
						$('#done-ok').fadeIn('slow').find('a').attr('href', data.result.permalink);
						form.reset();
					} else {
						showError(data.detail);
					}				
				} catch (err) {
					showError(textStatus);
				}
				$('#done-pending').hide();
				disabled(false);
				input.focus();
			}
		});
	}

	function getTeam() {
		if (teams.length === 1) return teams[0];
		return $('#teams :checked').val();
	}

	function pad(n) {
		return n <= 9 ? '0'+n : n;
	}

	function showError(msg) {
		$('#generic-err').hide().fadeIn('slow').find('.msg').text(msg);
	}

	function disabled(state) {
		$('form *').attr('disabled', state);
	}

})();
