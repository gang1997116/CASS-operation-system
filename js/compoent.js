
Vue.component('row-word-en', {
	
			props: ['title','webaddress','password','page','voice'],
			data: function () {
				return {
					
				}
			},
			template: `<div class="row">
			<div class="col-8"><a v-on:click="checkcode">{{ title }}</a></div>
			 <div class="col-4" style="color:red">Encrypted</div>
			 <audio id="player">
			         <source src="voice" id="player"></source>
			     </audio>
			   </div>`,
			methods:{
				checkcode : function () {
					var passcode=this.password;
					if(this.page=="file"){var result = prompt("Enter the roomcode","");}
					else{var result = prompt("Enter the passcode","");}
					if(result == passcode){
						alert("Congratulations");
						
						
						if(this.page=="file")
						{
						var i=Cookies.get('count');
						if(typeof(i) == "undefined"){
						Cookies.set('count', 1, { expires: 1 }); }
						else if(typeof(i) != "undefined"){
							Cookies.set('count', ++i, { expires: 1 });
						}
						console.log("i="+i);
						}
						else if(this.page=="light")
						{
							Cookies.set('keycard', 1, { expires: 1 }); 
						}
						else if(this.page=="root")
						{
							Cookies.set('root', 1, { expires: 1 }); 
						}
						window.location=this.webaddress;	
					}
					else{
						alert("Failed!😢 Get hint from the right top.")
					}
					
				},
				
			}
		})
		
Vue.component('row-word-de', {
			props: ['title','webaddress'],
			data: function () {
				return {}
			},
			template: `<div class="row">
			<div class="col-8"><a v-bind:href="webaddress">{{ title }}</a></div>
			  <div class="col-4">
						Decrypted
			  </div> </div>`,
			methods:{
				
			}
		})
Vue.component('row-button', {
			props: ['title','btnid','page'],
			data: function () {
				return {
					
				}
			},
			
			template: `<div class="row state-button">
			  <div class="col-8">{{ title }}</div>
			  <div class="col-4">
				<div class="onoffswitch">
				    <input v-on:click="isChecked($event)" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" v-bind:id="'myonoffswitch'+btnid" tag="0">
				    <label class="onoffswitch-label" v-bind:for="'myonoffswitch'+btnid">
				        <span class="onoffswitch-inner"></span>
				        <span class="onoffswitch-switch"></span>
				    </label>
				</div>
			  </div> </div>`,
			methods:{
				isChecked: function(event){
					if(this.page=="root")
					{
						if(confirm("You are about to deactivate  system files. This will result in deleting whole system. Do you want to proceed?"))
						{
						document.getElementById('push-button').style.display="block";	
						}
						else{
							event.target.checked = false;
						}
					}	
					else{
						var checkArray = document.getElementsByName("onoffswitch");
						document.getElementById('push-button').style.display="block";
						var currenttag=event.target.getAttribute("tag");
						//console.log("currenttag"+currenttag);
			
						if(currenttag=="1"){
							event.target.checked=false;
							event.target.setAttribute("tag","0");
							//console.log("相等");
							document.getElementById('push-button').style.display="none";
						}
						else {
							for (var i = 0; i < checkArray.length; i++) {
								checkArray[i].checked = false;
								checkArray[i].setAttribute("tag","0");
									
								}	
								//console.log("不相等");
								event.target.checked = true;
								event.target.setAttribute("tag","1");
								//console.log("tag"+event.target.getAttribute("tag"));
								this.$emit('changecode', this.btnid);
							}
				
							
					}
					
				},
				
				
			},
			
		})
		
		Vue.component('scan-code', {
					props: ['codesrc'],
					data: function () {
						return {}
					},
					template: `<div id="scan-code" class="scan-code">	
			<img class="close-button" src="img/cross.png" v-on:click="hidepanel" alt="">
			<img class="qr-holder" src="img/QR%20Holder.svg" alt="">
			<img class="qr-code" v-bind:src="codesrc" alt="">
			<div class="notice">
				<img src="img/Notification.svg" alt="">Please scan this code to camera in game
			</div>
			<p class="help">Notice: Point your phone screen towards your computer camera on game to scan the code.</p>
		</div>`,
					methods:{
						hidepanel: function(){
							document.getElementById('scan-code').style.display="none";
						}
					}
				})	
		Vue.component('basic-layout', {
					props: ['codesrc','title','backweb'],
					data: function () {
						return {}
					},
					template: `<div class="basic">
						<div class="cass" >
							CASS
						</div>
						<div class="title" >
							{{title}}
						</div>
						<slot></slot>
						<img class="play-button" src="img/stop.svg" v-on:click="playvoice" alt="">
						<a id="back-button" v-bind:href="backweb">
							<img class="back-button" src="img/Back-Button.svg" alt="">
						</a>
					<img class="basic-layout" src="img/Basic%20Layout.svg" alt="">
					<img class="files" src="img/files.png">
					<img class="status" src="img/status.png">
					</div>
					
					`,
					methods:{
						playvoice: function (){
							var voice=document.getElementsByClassName('audio')[0];
							var voicebtn=document.getElementsByClassName('play-button')[0];
							if (voice.paused) { //判断音乐是否在播放中，暂停状态
							                voice.play(); //音乐播放
							                voicebtn.src="img/play.svg"
							                 
							            } else { //播放状态
							                voice.pause(); //音乐停止
							                voicebtn.src="img/stop.svg"
							            }
						}
					}
				})	
		Vue.component('push-button', {
					props: ['distance'],
					data: function () {
						return {}
					},
					template: `<div id="push-button" v-bind:class="distance" v-on:click="pushUpdate()">
					PUSH UPDATE
					</div>`,
					methods:{
						pushUpdate: function(){
						document.getElementById('scan-code').style.display='block';
						
						}
					}
				})						
	