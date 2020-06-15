// I'm glad to see you there! :D
var player_x, player_y, player_vx, player_vy;
var player_vx0, player_vy0;
var player_width = 100, player_height = 20;
var player_width0 = 100, player_height0 = 20;
 
var points = 0;

var font2;

var objects = [];
var objects_count = 10;
var text = [];
var text_x = [];
var text_y = [];

var particles = [];
var particles_max = 100;
var actual_number_small = 0;

var frames=0;

var mouse_target=350;
var keyboard_control = true;

function draw()
{
	
	// print time
	textout(canvas,font2, Math.floor(frames/3600.0) + ":" + (Math.floor(frames/60.0) % 60).toString().padStart(2,'0') ,550,30,24,makecol(190,240,180),makecol(50,50,50),1);

	// print score
	if(points<=500)textout(canvas,font2,"Score: " + points,10,30,24,makecol(190,240,180),makecol(50,50,50),1);
	if(points>500&&points<1000){textout(canvas,font2,"Score: " + points + " wow!",10,30,24,makecol(190,240,180),makecol(50,50,50),1);}
	if(points>=1000&&points<5000){textout(canvas,font2,"Amazing score: " + points,10,30,24,makecol(190,240,180),makecol(50,50,50),1);}
	if(points>=5000&&points<9001){textout(canvas,font2,"Mad score: " + points + "",10,30,24,makecol(190,240,180),makecol(50,50,50),1);}
	if(points>=9001){textout(canvas,font2,"It's over 9000!",10,30,24,makecol(190,240,180),makecol(50,50,50),1);}
	
	for(var i = 0; i < objects_count; i++){
		var o = objects[i];
		if(text[i]>0){
			textout(canvas,font2,"+10",text_x[i],text_y[i],18,makecol(50,50,223),makecol(90,50,123),1);
		}
		if( o.active ) rectfill(canvas,o.x-o.width/2,o.y-o.height/2,o.width,o.height,makecol(o.col_r,o.col_g,o.col_b)); // makecol(100,50,70)
		if( !o.gravity ) {
			rectfill(canvas,o.x-10,o.y-10,20,20,makecol(132,232,167));
			rect(canvas,o.x-10,o.y-10,20,20,makecol(34,177,76),3);
		}
	};
	
	rectfill(canvas,player_x - player_width/2, player_y-player_height/2, player_width, player_height,makecol(20,20,20));
	rectfill(canvas,player_x - player_width0/2, player_y-player_height0/2, player_width0, player_height0,makecol(0,0,0));
	
	if( keyboard_control == false /*&& player_x != mouse_target*/ ){
		rectfill(canvas,player_x-5,player_y-5,10,10,makecol(50,50,50));
		rectfill(canvas,mouse_target-5,player_y-5,10,10,makecol(150,150,150));
	}
	
}

function initialize()
{
	for(var c = 0; c < objects_count ; c++){
		text[c]=-1;
		text_x[c]=0;
		text_y[c]=0;
		
		objects[c]={ x:rand()%(SCREEN_W-20)+10, 
					 y:rand()%2000-2010,
					 active: true,
					 vx:0,
					 vy:0,
					 width:20,
					 width0:20,
					 height:20,
					 height0:20,
					 gravity:false,
					 collision:0,
					 points:0,
					 col_r:200,
					 col_g:200,
					 col_b:200,
					 col_rk:100,
					 col_gk:50,
					 col_bk:70,
					 col_r0:200,
					 col_g0:200,
					 col_b0:200,
					 hits:0,
					 explode:5,
					 type:0,
					 wiggle:0,
					 bounce:0
					}
	}
	
}

function init_default_type(indeks){
	var o = objects[indeks];
	o.active = true;
	o.gravity = false;
	o.y = rand()%2000-2010;
	o.x = rand()%(SCREEN_W-20)+10
	o.points = 0;
	o.vx=0;
	o.vy=0;
	o.col_r=200;o.col_g=200;o.col_b=200;
	o.col_rk=100;o.col_gk=50;o.col_bk=70;
	o.col_r0=200;o.col_g0=200;o.col_b0=200;
	o.hits=0;
	o.width=20;
	o.width0=20;
	o.height=20;
	o.height0=20;
	o.explode = 5;
	o.wiggle = 0;
	o.bounce = 0;
	o.collision=0;
}

function init_type1(indeks){
	var o = objects[indeks];
}

function interpolacja(px, ox)
{
	var w = (ox-px)/22
	if(w>5) w = 5;
	if(w<-5) w=-5;
	return w;
}



function update()
{
	frames++;
	for(var i = 0; i < objects_count; i++){
		
		text[i]--;
		
		var o = objects[i];
		o.collision--;
		
		if(!o.gravity && o.active){
			o.y += 3;
		}else
		{
			o.y += o.vy;
			o.vy += 0.1;
			o.x += o.vx;
		}
		
		o.bounce--;
		if( ((o.x >= SCREEN_W - o.width/2) || (o.x < o.width/2)) && o.bounce < 0 )
		{
			o.vx *= -1;
			o.bounce = 4;
			o.x = Math.min(o.x, SCREEN_W - o.width/2);
			o.x = Math.max(o.x, o.width/2);
		}
		
		if (o.y >= SCREEN_H + o.height/2){
			
			if(o.gravity && o.active)
			{
				points -= 1;
			}
			
			init_default_type(i);
			o.type = rand()%5;
			if(o.type>=2)o.type=0;
			
			if(o.type == 1){
				o.col_r0=102;o.col_g0=203;o.col_b0=115;
				o.col_r=102;o.col_g=203;o.col_b=115;
				o.col_rk=50;o.col_gk=30;o.col_bk=20;
			}			
			
		}
		text_x[i]+= 1;
		text_y[i]-= 1.5;
		
		if( !o.active ) continue;
		
		o.wiggle++;
		if( o.type==0 && (o.hits >= o.explode) )
		{
			o.x += Math.sin(0.5*o.wiggle);
			o.width = 22;
			o.height = 22;
		}
		if( o.type == 1 && (o.hits >= o.explode))
		{
			o.width = o.width0 + 10*Math.abs(Math.sin(0.1*o.wiggle));
		}
		
		
		if( Math.abs(o.x - player_x) < (player_width/2 + o.width/2)
			&& Math.abs(o.y-player_y) < (player_height/2 + o.height/2))
		{
			o.gravity = true;
			if(o.collision < 0){
				points +=o.points;
				o.points++;
				o.collision=20;
				o.vx *= 0.85;
				o.vx += interpolacja(player_x, o.x);
				o.hits +=1;
				//Color_increment
				var k = o.explode-o.hits;
				if( k > 0)
				{
					o.col_r += (o.col_rk - o.col_r0)/o.explode;
					o.col_g += (o.col_gk - o.col_g0)/o.explode;
					o.col_b += (o.col_bk - o.col_b0)/o.explode;
				}
				if(o.hits>o.explode)
				{
					if(o.type==1){
						player_width += 50;
						o.active=false;
					}
					if(o.type==0){
						text[i]=35;
						text_x[i]=o.x;
						text_y[i]=o.y;
						o.active=false;
						points+=10;
					}
				}
				
			}
			o.vy= - 7.78 -0.4*frand()*frand();
		}
	}
	
	if(player_width<player_width0){player_width = player_width0;}
	if(player_width>player_width0){player_width -= 0.04;}
	
	//if ((key[KEY_LEFT] || key[KEY_A]) || (mouse_b&1 && mouse_x < SCREEN_W/2)) player_x-=8;
	//if ((key[KEY_RIGHT] || key[KEY_D]) || (mouse_b&1 && mouse_x >= SCREEN_W/2) ) player_x+=8;
	
	//if ((key[KEY_LEFT] || key[KEY_A]) || (mouse_pressed && mouse_x < SCREEN_W/2)) player_x-=8;
	//if ((key[KEY_RIGHT] || key[KEY_D]) || (mouse_pressed && mouse_x >= SCREEN_W/2) ) player_x+=8;
	
	//if ((key[KEY_LEFT] || key[KEY_A]) || (/*mouse_pressed &&*/ mouse_x < SCREEN_W/3.0)) player_x-=8;
	//if ((key[KEY_RIGHT] || key[KEY_D]) || (/*mouse_pressed && */mouse_x >= SCREEN_W*2.0/3.0) ) player_x+=8;
	/*
		if(mouse_pressed)mouse_target=mouse_x;
		if ( mouse_target >= player_x ) player_x+=8;
		else if ( mouse_target <= player_x ) player_x-=8;
		else player_x=mouse_target;
	*/
	
	/*
		if(mouse_pressed)mouse_target=mouse_x;
		if ( mouse_target - player_x >= 8.0 ) player_x+=8.0;
		else if ( mouse_target - player_x <= -8.0 ) player_x-=8.0;
		else player_x=mouse_target;
	*/
	
	
	/*
		if(mouse_pressed||mouse_b&1)mouse_target=mouse_x;
		if ((key[KEY_LEFT] || key[KEY_A]) || (mouse_target - player_x >= 8.0) ) player_x+=8.0;
		else if ((key[KEY_RIGHT] || key[KEY_D]) || (mouse_target - player_x <= -8.0) ) player_x-=8.0;
		else player_x=mouse_target;
	*/
	if((key[KEY_LEFT] || key[KEY_A]) || (key[KEY_RIGHT] || key[KEY_D])) keyboard_control = true;
	if(mouse_pressed||mouse_b&1){mouse_target=mouse_x;keyboard_control=false;}
	if (((key[KEY_RIGHT] || key[KEY_D]) && keyboard_control) || ((mouse_target - player_x >= 8.0) && keyboard_control == false ) ) player_x+=8.0;
	else if ( ((key[KEY_LEFT] || key[KEY_A]) && keyboard_control)|| ((mouse_target - player_x <= -8.0)&& keyboard_control == false) ) player_x-=8.0;
	else if (keyboard_control == false) player_x=mouse_target;
	player_x = Math.min(player_x, SCREEN_W + player_width/2 - player_width0);
	player_x = Math.max(player_x,        0 - player_width/2 + player_width0);

	
	
	
}

function main()
{
	//enable_debug('debug');
	allegro_init_all("game_canvas", 640, 480);
	font2 = load_font("Bullpen3D.ttf");
	player_x = SCREEN_W / 2;
	player_y = SCREEN_H - 50;
	initialize();
	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

