$(function()
{
	var fichaSeleccionada; //Ficha seleccionada por usuario
	var menuVisible = false;
	var contFichas = 32;
	var tablero = [
		{id: "#f1", ficha: true, x: 3, y: 1}, //Fila 1
		{id: "#f2", ficha: true, x: 4, y: 1},
		{id: "#f3", ficha: true, x: 5, y: 1},
		{id: "#f4", ficha: true, x: 3, y: 2}, //Fila 2
		{id: "#f5", ficha: true, x: 4, y: 2},
		{id: "#f6", ficha: true, x: 5, y: 2},
		{id: "#f7", ficha: true, x: 1, y: 3}, //Fila 3
		{id: "#f8", ficha: true, x: 2, y: 3},
		{id: "#f9", ficha: true, x: 3, y: 3},
		{id: "#f10", ficha: true, x: 4, y: 3},
		{id: "#f11", ficha: true, x: 5, y: 3},
		{id: "#f12", ficha: true, x: 6, y: 3},
		{id: "#f13", ficha: true, x: 7, y: 3},
		{id: "#f14", ficha: true, x: 1, y: 4}, // Fila 4
		{id: "#f15", ficha: true, x: 2, y: 4},
		{id: "#f16", ficha: true, x: 3, y: 4},
		{id: "#f17", ficha: false, x: 4, y: 4},
		{id: "#f18", ficha: true, x: 5, y: 4},
		{id: "#f19", ficha: true, x: 6, y: 4},
		{id: "#f20", ficha: true, x: 7, y: 4},
		{id: "#f21", ficha: true, x: 1, y: 5}, //Fila 5
		{id: "#f22", ficha: true, x: 2, y: 5},
		{id: "#f23", ficha: true, x: 3, y: 5},
		{id: "#f24", ficha: true, x: 4, y: 5},
		{id: "#f25", ficha: true, x: 5, y: 5},
		{id: "#f26", ficha: true, x: 6, y: 5},
		{id: "#f27", ficha: true, x: 7, y: 5},
		{id: "#f28", ficha: true, x: 3, y: 6}, //Fila 6
		{id: "#f29", ficha: true, x: 4, y: 6},
		{id: "#f30", ficha: true, x: 5, y: 6},
		{id: "#f31", ficha: true, x: 3, y: 7}, //Fila 7
		{id: "#f32", ficha: true, x: 4, y: 7},
		{id: "#f33", ficha: true, x: 5, y: 7},
	];


// ELimina ficha
	function eliminarFicha( idCasilla )
	{		
		$(idCasilla).attr('class', 'casilla');
		for(var i=0; i<tablero.length; i++)
		{
			if(tablero[i].id === idCasilla)
			{
				tablero[i].ficha = false;
			}
		}
	}

// Muestra ficha
	function mostrarFicha( idCasilla )
	{
		$(idCasilla).attr('class', 'ficha');	
		for(var i=0; i<tablero.length; i++)
		{
			if(tablero[i].id === idCasilla)
			{
				tablero[i].ficha = true;
			}
		}
	}

	//Selecciona ficha
	function seleccionarFicha( idCasilla )
	{
		
		if(fichaSeleccionada != undefined)
		{
			quitarFichaSel(fichaSeleccionada);
		}

		$(idCasilla).attr('class', 'fichaSeleccionada');
		fichaSeleccionada = idCasilla;
	}

// Cancela seleccion de ficha
	function quitarFichaSel( idCasilla )
	{		
		if( $(fichaSeleccionada).attr('class') === 'fichaSeleccionada' )
			$(idCasilla).attr('class', 'ficha');
	}

	// Define casilla a la que se movera la ficha 
	
	function modeloMovFichas ( idCasilla )
	{
		var ubicFicha = {}; //Ubicacion (x,y) casilla vacía
		var miFicha = {}; //Ubicacion (x,y) casilla de ficha seleccionada
		var fichaEliminada = {}; //Ubicacion (x,y) casilla ficha a eliminar
		ubicFicha.x = tablero[ idCasilla.substring( 2,idCasilla.length ) - 1 ].x;
		ubicFicha.y = tablero[ idCasilla.substring( 2,idCasilla.length ) - 1 ].y;
		miFicha.x = tablero[ fichaSeleccionada.substring( 2,fichaSeleccionada.length ) - 1 ].x;
		miFicha.y = tablero[ fichaSeleccionada.substring( 2,fichaSeleccionada.length ) - 1 ].y;

		//Juego en x
		if( miFicha.y === ubicFicha.y )
		{		
			if( Math.abs( miFicha.x - ubicFicha.x ) === 2 )
			{				
				fichaEliminada.x = Math.max(miFicha.x, ubicFicha.x) - 1;
				fichaEliminada.y = miFicha.y;
				for(var i = 0; i<tablero.length; i++)
				{
					if(tablero[i].x === fichaEliminada.x && tablero[i].y === fichaEliminada.y)
					{
						
						if( tablero[i].ficha === true )
						{
							eliminarFicha(tablero[i].id); 
							eliminarFicha(fichaSeleccionada); 
							mostrarFicha(idCasilla); 
							contFichas --;
							estadoPartida(); 
						}
					}
				}
					
			}
		}

		//Juego en y
		if( miFicha.x === ubicFicha.x )
		{
			
			if( Math.abs( miFicha.y - ubicFicha.y ) === 2 )
			{			
				fichaEliminada.y = Math.max(miFicha.y, ubicFicha.y) - 1;
				fichaEliminada.x = miFicha.x;
				for(var i = 0; i<tablero.length; i++)
				{
					if(tablero[i].x === fichaEliminada.x && tablero[i].y === fichaEliminada.y)
					{						
						if( tablero[i].ficha === true )
						{
							eliminarFicha(tablero[i].id);
							eliminarFicha(fichaSeleccionada);
							mostrarFicha(idCasilla); 
							contFichas --; 
							estadoPartida(); 
						}
					}
				}
			}
		}
	}

	// Manejo de ubicacion seleccionada
	function clickCasilla( idCasilla )
	{		
		if( $(idCasilla).attr('class') === 'casilla' )
		{	
			if(fichaSeleccionada != undefined)
			{
				modeloMovFichas(idCasilla);
			}
		}		
		else
		{
			seleccionarFicha( idCasilla );
		}
	}

	// Define estado del juego
	function estadoPartida()
	{
		var movimientosPosibles = false;
		var tempMovs;
		var iter = 0;

		//Juego finalizado exitoso
		if(contFichas == 1)
		{
			alert('Juego Exitoso! ¿Nueva partida?');
			cambioMenu();
		}
		//Juego finalizado no exitoso
		else
		{
			while( (iter < tablero.length) && (!movimientosPosibles) )
			{
				//valida si hay fichas en el juego
				if(tablero[iter].ficha)
				{					
					if(iter+1==3 || iter+1==6 || iter+1==9 || iter+1==10 || iter+1==11 || iter+1==12 || iter+1==13 || iter+1==16 || iter+1==17 || iter+1==18 || iter+1==19 || iter+1==20 || iter+1==23 || iter+1==24 || iter+1==25 || iter+1==26 || iter+1==27 || iter+1==30 || iter+1==33)
					{
						if( tablero[iter-1].ficha && !tablero[iter-2].ficha)
							movimientosPosibles = true;
					}
					if(iter+1==1 || iter+1==4 || iter+1==7 || iter+1==8 || iter+1==9 || iter+1==10 || iter+1==11 || iter+1==14 || iter+1==15 || iter+1==16 || iter+1==17 || iter+1==18 || iter+1==21 || iter+1==22 || iter+1==23 || iter+1==24 || iter+1==25 || iter+1==28 || iter+1==31)
					{
						if( tablero[iter+1].ficha && !tablero[iter+2].ficha)
							movimientosPosibles = true;
					}
					if(iter+1==7 || iter+1==8 || iter+1==9 || iter+1==10 || iter+1==11 || iter+1==12 || iter+1==13)
					{
						if( tablero[iter+7].ficha && !tablero[iter+14].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==1 || iter+1==2 || iter+1==3)
					{
						if( tablero[iter+3].ficha && !tablero[iter+8].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==4 || iter+1==5 || iter+1==6)
					{
						if( tablero[iter+5].ficha && !tablero[iter+12].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==16 || iter+1==17 || iter+1==18)
					{
						if( tablero[iter+7].ficha && !tablero[iter+12].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==23 || iter+1==24 || iter+1==25)
					{
						if( tablero[iter+5].ficha && !tablero[iter+8].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==21 || iter+1==22 || iter+1==23 || iter+1==24 || iter+1==25 || iter+1==26 || iter+1==27)
					{
						if( tablero[iter-7].ficha && !tablero[iter-14].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==9 || iter+1==10 || iter+1==11)
					{
						if( tablero[iter-5].ficha && !tablero[iter-8].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==16 || iter+1==17 || iter+1==18)
					{
						if( tablero[iter-7].ficha && !tablero[iter-12].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==28 || iter+1==29 || iter+1==30)
					{
						if( tablero[iter-5].ficha && !tablero[iter-12].ficha )
							movimientosPosibles = true;
					}
					if(iter+1==31 || iter+1==32 || iter+1==33)
					{
						if( tablero[iter-3].ficha && !tablero[iter-8].ficha )
							movimientosPosibles = true;
					}
				}
				iter++;
			}
			if(!movimientosPosibles)
			{
				alert("No tienes mas movimientos posibles.");
				cambioMenu();
			}
		}
	}

	

//Ocultar menu
	function cambioMenu()
	{
		if(menuVisible)
		{
			$(".menuClass").attr("style", "fill-opacity:0;stroke-opacity:0");
			$("#menu").attr("width", "0");
			$("#menu").attr("height", "0");
			$("#reiniciar").html("");
			$("#volverJuego").html("");
			menuVisible = false;
		}
		else
		{
			$(".menuClass").attr("style", "");
			$("#menu").attr("width", "100%");
			$("#menu").attr("height", "100%");
			$("#reiniciar").html("Reiniciar partida");
			$("#volverJuego").html("Volver al juego");
			menuVisible = true;
		}
	}
// Reiniciar juego
	function reiniciarJuego()
	{
		tablero = [
			{id: "#f1", ficha: true, x: 3, y: 1},//Primera fila
			{id: "#f2", ficha: true, x: 4, y: 1},
			{id: "#f3", ficha: true, x: 5, y: 1},
			{id: "#f4", ficha: true, x: 3, y: 2},//Segunda fila
			{id: "#f5", ficha: true, x: 4, y: 2},
			{id: "#f6", ficha: true, x: 5, y: 2},
			{id: "#f7", ficha: true, x: 1, y: 3},//Tercera fila
			{id: "#f8", ficha: true, x: 2, y: 3},
			{id: "#f9", ficha: true, x: 3, y: 3},
			{id: "#f10", ficha: true, x: 4, y: 3},
			{id: "#f11", ficha: true, x: 5, y: 3},
			{id: "#f12", ficha: true, x: 6, y: 3},
			{id: "#f13", ficha: true, x: 7, y: 3},
			{id: "#f14", ficha: true, x: 1, y: 4},//Cuarta fila
			{id: "#f15", ficha: true, x: 2, y: 4},
			{id: "#f16", ficha: true, x: 3, y: 4},
			{id: "#f17", ficha: false, x: 4, y: 4},
			{id: "#f18", ficha: true, x: 5, y: 4},
			{id: "#f19", ficha: true, x: 6, y: 4},
			{id: "#f20", ficha: true, x: 7, y: 4},
			{id: "#f21", ficha: true, x: 1, y: 5},//Quinta fila
			{id: "#f22", ficha: true, x: 2, y: 5},
			{id: "#f23", ficha: true, x: 3, y: 5},
			{id: "#f24", ficha: true, x: 4, y: 5},
			{id: "#f25", ficha: true, x: 5, y: 5},
			{id: "#f26", ficha: true, x: 6, y: 5},
			{id: "#f27", ficha: true, x: 7, y: 5},
			{id: "#f28", ficha: true, x: 3, y: 6},//Sexta fila
			{id: "#f29", ficha: true, x: 4, y: 6},
			{id: "#f30", ficha: true, x: 5, y: 6},
			{id: "#f31", ficha: true, x: 3, y: 7},//Septima fila
			{id: "#f32", ficha: true, x: 4, y: 7},
			{id: "#f33", ficha: true, x: 5, y: 7},
		];

		quitarFichaSel(fichaSeleccionada);
		for(var i=0; i<tablero.length; i++)
		{
			//$(tablero[i].id).attr('class', 'ficha');
			if(i == 16)
				eliminarFicha( tablero[i].id );
			else
				mostrarFicha( tablero[i].id );
		}
		contFichas = 32;
		fichaSeleccionada = undefined;
		cambioMenu();
	}

	//Eventos
	$(".botonM").on('click', cambioMenu);
	$("#reiniciar").on('click', reiniciarJuego);
	$("#volverJuego").on('click', cambioMenu);

	$("#f1").on('click', function(){clickCasilla("#f1");});
	$("#f2").on('click', function(){clickCasilla("#f2");});
	$("#f3").on('click', function(){clickCasilla("#f3");});
	$("#f4").on('click', function(){clickCasilla("#f4");});
	$("#f5").on('click', function(){clickCasilla("#f5");});
	$("#f6").on('click', function(){clickCasilla("#f6");});
	$("#f7").on('click', function(){clickCasilla("#f7");});
	$("#f8").on('click', function(){clickCasilla("#f8");});
	$("#f9").on('click', function(){clickCasilla("#f9");});
	$("#f10").on('click', function(){clickCasilla("#f10");});
	$("#f11").on('click', function(){clickCasilla("#f11");});
	$("#f12").on('click', function(){clickCasilla("#f12");});
	$("#f13").on('click', function(){clickCasilla("#f13");});
	$("#f14").on('click', function(){clickCasilla("#f14");});
	$("#f15").on('click', function(){clickCasilla("#f15");});
	$("#f16").on('click', function(){clickCasilla("#f16");});
	$("#f17").on('click', function(){clickCasilla("#f17");});
	$("#f18").on('click', function(){clickCasilla("#f18");});
	$("#f19").on('click', function(){clickCasilla("#f19");});
	$("#f20").on('click', function(){clickCasilla("#f20");});
	$("#f21").on('click', function(){clickCasilla("#f21");});
	$("#f22").on('click', function(){clickCasilla("#f22");});
	$("#f23").on('click', function(){clickCasilla("#f23");});
	$("#f24").on('click', function(){clickCasilla("#f24");});
	$("#f25").on('click', function(){clickCasilla("#f25");});
	$("#f26").on('click', function(){clickCasilla("#f26");});
	$("#f27").on('click', function(){clickCasilla("#f27");});
	$("#f28").on('click', function(){clickCasilla("#f28");});
	$("#f29").on('click', function(){clickCasilla("#f29");});
	$("#f30").on('click', function(){clickCasilla("#f30");});
	$("#f31").on('click', function(){clickCasilla("#f31");});
	$("#f32").on('click', function(){clickCasilla("#f32");});
	$("#f33").on('click', function(){clickCasilla("#f33");});
})

