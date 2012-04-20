Ejemplos RelojRegresivo.
==============================================================================

Ejemplo 1
--------------------------------------------------

### 5 dias, 20  Horas, 00 minutos y 3segundos


<div id='clock'></div>


#### Agregando libreria:

	<script language="Javascript"  type="text/javascript" src="clockCountdown.js"></script>


#### Código HTML:

	<div id='clock'></div>

#### Llamada en javascript:

	<script language="Javascript"  type="text/javascript">
		window.onload = function (){
			r = new clockCountdown('clock',{'days':5,'hours':20,'minutes':00,'seconds':3});
		}
	</script>


##Ejemplo 2:

<div id='clock-2' class='other_clock'></div>
		
###HTML

	<div id='clock-2' class='other_clock'></div>

#### Llamada en javascript:

	r2 = new clockCountdown('clock-2',{'days':5,'hours':10,'minutes':05,'seconds':50});


##Ejemplo 3:
	
Como puedes ver puedes agregar multiples relojes cada uno con una configuracion distinta:

<div id='clock-3' class='other_clock'></div>
		
###HTML

	<div id='clock'></div>
	<div id='clock-2' class='other_clock'></div>
	<div id='clock-3' class='other_clock'></div>

#### Llamada en javascript:

	<script language="Javascript"  type="text/javascript">
		window.onload = function (){
			r = new clockCountdown('clock',{'days':5,'hours':20,'minutes':00,'seconds':3});
			r2 = new clockCountdown('clock-2',{'days':5,'hours':10,'minutes':05,'seconds':50});
			r3 = new clockCountdown('clock-3',{'days':5,'hours':10,'minutes':05,'seconds':50});
		}
	</script>
	


##CSS y estilo:

Puedes agregarle tus estilos aqui un pequeño ejemplo:

	#clock, #clock-2, #clock-3{
		padding:0;
		height:70px;
		/*position: absolute;*/
		top: 0px;
		right: 0px;
		background: #bcbd72;
		color: #2a2807;
		padding:4px;
		border:2px solid #2a2807;
		font-size:15px;
		width: 320px;
		text-shadow:#6d691e 5px 5px 5px,#6d691e -5px -5px 5px;
	}

	.clockCountdownNumber{
		float:left;
		background:URL('numeros.png');
		display:block;
		width:34px;
		height:50px;
	}

	.clockCountdownSeparator_days,
	.clockCountdownSeparator_hours,
	.clockCountdownSeparator_minutes,
	.clockCountdownSeparator_seconds
	{
		float:left;
		display:block;
		width:10px;
		height:50px;
	}
	.clockCountdownFootItem{
		width:80px;
		float:left;
		text-align:center;
	}

#Caracteristicas Principales.

 - Javascript puro apegado al ECMAScript
 - No depende de ninguna libreria.
 - Soporte de ejecución multiple basada en una pila de objetos.
 - Ligero.
 - Cross Browser.


## Extras

Tal vez te preguntaras como puedes obtener la diferencia en dias, horas, minutos y segundos para generar el formato que te pide el `clockCountdown.js`, esta diferencia se puede objetener con `javascript` pero a mi consideración lo mejor es generarla del lado del servidor, razón principal es que puede haber algunas diferencias entre la zona horaria de la maquina del usuario o poder tener mal configurado su equipo esto nos generaria una diferencia no del todo cierta, a diferencia de lo que ocurre si lo generamos desde el lado del servidor una forma de generar esto podemos usar la siguiente funcion en `php`:

	function otherDiffDate($end='2020-06-09 10:30:00', $out_in_array=false){
			$intervalo = date_diff(date_create(), date_create($end));
			$out = $intervalo->format("Years:%Y,Months:%M,Days:%d,Hours:%H,Minutes:%i,Seconds:%s");
			if(!$out_in_array)
				return $out;
			$a_out = array();
			array_walk(explode(',',$out),
			function($val,$key) use(&$a_out){
				$v=explode(':',$val);
				$a_out[$v[0]] = $v[1];
			});
			return $a_out;
	}


###ejemplo ejecucion 1

	echo otherDiffDate();

#### Salida:

	Years:08,Months:01,Days:22,Hours:17,Minutes:5,Seconds:26

###ejemplo ejecucion 2

	print_r(otherDiffDate('2020-01-01 20:30:00',true));

#### Salida:

	Array
	(
		[Years] => 07
		[Months] => 08
		[Days] => 15
		[Hours] => 03
		[Minutes] => 3
		[Seconds] => 48
	)
