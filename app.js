const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const previousBtn = $ ('.btn-prev')
const randomBtn = $('.btn-random')
const loopBtn = $('.btn-repeat')
const volumeIcon = $('.volume > i')
const currentVolume = $('.volume-range')
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Golden Hour',
            singer: 'Jake',
            path: './assets/music/goldenhour.mp3',
            img: 'https://i.picsum.photos/id/263/536/354.jpg?hmac=Tn8MK-aH0rIHy83oIIGbmrSSJcJE2PI2kZBy8oNFO6s'
        },
        {
            name: 'Another Love',
            singer: 'BA',
            path: './assets/music/anotherlove.mp3',
            img: 'https://i.picsum.photos/id/243/536/354.jpg?hmac=LfqhpnBszg-pS8BQHemVFexSLyoiFYP8Pw14oAiPpE4'
        },
        {
            name: 'Death Bed',
            singer: 'Abc',
            path: './assets/music/deathbed.mp3',
            img: 'https://i.picsum.photos/id/740/536/354.jpg?hmac=FEZtXn-RDrVWDOPFT3ihLYZmxa-x-ENiGOY1JGArWGQ'
        },
        {
            name: 'Glim of Us',
            singer: 'Juji',
            path: './assets/music/glimpseofus.mp3',
            img: 'https://i.picsum.photos/id/605/536/354.jpg?hmac=UEikA1VtUKhG5RZNv-Bokpe3xjPIdzzW9akGBUFmB5k'
        },
        {
            name: 'Comethru',
            singer: 'JVK',
            path: './assets/music/comethru.mp3',
            img: 'https://i.picsum.photos/id/816/536/354.jpg?hmac=5mIpQ67g4pJlWVrgL3whbmlV3qzRBLmSu3rOl6UK2pw'
        },
        {
            name: 'This is what falling in love',
            singer: 'Jake',
            path: './assets/music/thisiswhatfallinginlovefeelslike.mp3',
            img: 'https://i.picsum.photos/id/218/536/354.jpg?hmac=yVh3J9narBFhF0sDwgdFrpr_uDpVeMN4AhrkMuvq1Vs'
        },
        {
            name: '2002',
            singer: 'Annie',
            path: './assets/music/2002.mp3',
            img: 'https://i.picsum.photos/id/294/536/354.jpg?hmac=1trH5rfCyXlR6QVlX__i7xva9e8Oo5VKvhoZ1L7B4S8'
        },
    ],

    render: function() {
        const html = this.songs.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>  
            </div> 
        `
        })
        $('.playlist').innerHTML = html.join('')
    },
    //chuyen bai 
    nextSong() {
       this.currentIndex++
       if(this.currentIndex > this.songs.length-1) this.currentIndex = 0
       this.loadCurrentSong()
       progress.value = 0
       audio.play()
    },

    //random bai
    randomSong() {
        var index = Math.floor(Math.random() * 1000) % this.songs.length
        this.currentIndex = index
        this.loadCurrentSong()
        progress.value = 0
        audio.play()
    },

    handleEvent: function() {
        _this = this
        const cdWidth = cd.offsetWidth
        var randomClicked = false
        //Check xem ic random da duoc click hay chua
        randomBtn.onclick = function() {
            console.log('random')
            if(!randomClicked) {
                randomClicked = true 
                randomBtn.classList.add('active')
            }
            else {
                randomClicked = false
                randomBtn.classList.remove('active')
            }
        },

        //Xy ly phong to thu nho dia CD
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth /  cdWidth
        }
        //Xu ly khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
           
        }
        //Xy ly khi play = space
        window.addEventListener('keydown', function (event) {
            var key = event.code;
            if (key === 'Space') { 
                audio.paused ? audio.play() : audio.pause();
            }
          })
        //Khi song duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            cdThumb.classList.add('rotating')
            player.classList.add('playing')
        }
        //Khi song bi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumb.classList.remove('rotating')
        }

        //Khi tien do  bai hat thay doi
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent 
            }
        }

        //Xu ly khi tua 
        progress.onchange = function(e) {
            const seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime
        }

        //Xu ly khi next 
        nextBtn.onclick = function() {
             //Khi ic random da duoc click
            if(randomClicked) {
                _this.randomSong()
            }
            //Ic random khong duoc click
            else {
                _this.nextSong()
            } 
            _this.render()
        } 

        //Xu ly khi previous
        previousBtn.onclick = function () {
            _this.currentIndex--
            if(_this.currentIndex < 0) _this.currentIndex = _this.songs.length-1
           _this.loadCurrentSong()
           progress.value = 0
           audio.play()
           _this.render()
        }

        //Xu ly khi loop  
        loopBtn.onclick = function() {
            if(audio.loop) {
                audio.loop = false
                loopBtn.classList.remove('active')
            }
            else {
                audio.loop = true
                loopBtn.classList.add('active')
            } 
        }
        
        //Xy ly khi het bai
        audio.addEventListener('ended', function() {    
            //Khi ic random da duoc click
            if(randomClicked) {
                _this.randomSong()
            }
            //Ic random khong duoc click
            else {
                _this.nextSong()
            }
        } , false)

        //Xu ly khi mute 
        var isMuted = false
        volumeIcon.onclick = function() {
            if(!isMuted) {
                isMuted = true
                volumeIcon.classList.remove('fa-volume-up')
                volumeIcon.classList.add('fa-volume-mute')
                audio.volume = 0
            }
            else {
                isMuted = false
                volumeIcon.classList.remove('fa-volume-mute')
                volumeIcon.classList.add('fa-volume-up')
                audio.volume = currentVolume.value / 100
            
            }
        }

        //Xu ly khi change volume
        currentVolume.onchange = function(e) {
            const seekVolume =  e.target.value / 100
            audio.volume = seekVolume
        }


    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },

   

    start: function(){
        //Dinh nghia cac thuoc tinh cho Object
        this.defineProperties()
        
        //Lang nghe va xu ly cac su kien
        this.handleEvent()

        //Tai thong tin bai hat vao UI khi chay ung dung
        this.loadCurrentSong()

        //Render play list
        this.render()
        
    }
}

app.start()
    

