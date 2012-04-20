/*
 * Copyright (c) 2012 Fitorec <chanerec@gmail.com>
 * Dual licensed under GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

//contructor del clockCountdown
clockCountdown = function( id , remaining ){
	this.id = id;
	this.remaining = remaining;
	this.h=50;
	clockCountdown.clocksRegisters[clockCountdown.clocksRegisters.length] = { 'id': id, 'clock' : this };
	html = ''; foot = '';
	for(k in clockCountdown.intervalInfo){
		for(j=1; j>=0; j--)
			html = '<div id="'+this.id+'_'+k+'_digit_'+j+'" class="clockCountdownNumber"></div>' + html;
		foot = '<div class="clockCountdownFootItem">'+k+'</div>' + foot;
		if(k!='days')
			html = '<div class="clockCountdownSeparator_'+k+'"></div>' + html;
	}
	document.getElementById(this.id).innerHTML = html + '<div class="clockCountdownFoot">'+foot+'</div>';
	/* pone en su posicion el fondo de los digitos */
	for(k in clockCountdown.intervalInfo){
		e = document.getElementById(this.id+'_'+k+'_digit_1');
		n = this.remaining[ k ];
		pos_y = ((n%10) * 6)*50;
		e.style.backgroundPosition = "0 -"+pos_y+"px";
		e = document.getElementById(this.id+'_'+k+'_digit_0');
		n = this.remaining[ k ];
		pos_y = (parseInt(n/10) * 6)*50;
		e.style.backgroundPosition = "0 -"+pos_y+"px";
		this.remaining[ k ]++;
	}
	clockCountdown.update(id);
}//end clockCountdown constructor.

/* Areglo utilizado como pila de los clockes que se agreguen(soporte para multiples clockes) */
clockCountdown.clocksRegisters = [];
/* info de los intervalos seg,min,horas, dias sus limites y el sig. digito a modificar en caso de ser necesario */
clockCountdown.intervalInfo =  {
	'seconds':{'limit':60,'next': 'minutes'},
	'minutes':{'limit':60,'next': 'hours'},
	'hours':{'limit':24,'next': 'days'},
	'days':{'limit':365,'next': null}
}
/* 
 * http://www.pagecolumn.com/javascript/settimeout.htm
 * */
clockCountdown.update = function (id_clock){
		var clock = null;
		var bandFin = false; /* esta bandera se activa cuando el contador ha llegado al fin */
		for(k in clockCountdown.clocksRegisters)
			if( clockCountdown.clocksRegisters[k].id  == id_clock){
				clock = clockCountdown.clocksRegisters[k].clock;
				break;
			}
		if(!clock) return null;
		change =  {'seconds': true,'minutes': false,'hours':false,'days':false};
		clock.remaining.seconds-=1;		
		for(label in clockCountdown.intervalInfo){
			if(clock.remaining[label] == 0){
				clock.remaining[label] = clockCountdown.intervalInfo[ label ].limit;
				if(label != 'days'){
					nextDigit = clockCountdown.intervalInfo[ label ].next;
					--clock.remaining[nextDigit];
					change[nextDigit] = true;
				}
			}
			if( change[label] === false)
				continue;
			/* Realiza la transicion si existio un cambio del digito d n a n-1 */
			clockCountdown.transition( clock.id+'_'+label+'_digit_1',clock.remaining[label]%10, 1, 50);
			if( clock.remaining[label] == clockCountdown.intervalInfo[label].limit || clock.remaining[label]%10==0){
				//Si en el digito d las decenas sufrio 1cambio realizamos transicion
				n = parseInt( clock.remaining[label]/10 );
				if( label == 'hours' && clock.remaining[label] == clockCountdown.intervalInfo[label].limit ){
					n++;
				}//endIf
				clockCountdown.transition( clock.id+'_'+label+'_digit_0',n, 1, 50);
			}//endIf
		}//endFor
	if(!bandFin)
		setTimeout("clockCountdown.update('"+id_clock+"')",1000);
}//end clockCountdown.update

/* Realiza una transicion suave(en 6 pasos) para el decremento del digito de n a n-1
 */
clockCountdown.transition = function (id,n, paso, h){
	if(paso>6){
		return;
	}
	pos_y = (n*6 - paso)*h;
	if(n==0){
			pos_y = 2700;
			paso = 6;
	}
	e = document.getElementById(id);
	e.style.backgroundPosition = "0 -"+pos_y+"px";
	setTimeout("clockCountdown.transition('"+id+"',"+n+","+(paso+1)+", "+h+")",100);
}//end clockCountdown.transition
