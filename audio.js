// 获取元素
const audio = document.getElementById('audioTag');
const playPauseBtn = document.getElementById('playPause');

// 测试：在控制台输出，确认 JS 文件被加载了
console.log('audio.js 加载成功！');
console.log('audio 元素：', audio);
console.log('playPauseBtn 按钮：', playPauseBtn);

// 播放/暂停功能
playPauseBtn.addEventListener('click', function() {
    console.log('按钮被点击了');
    
    if (audio.paused) {
        console.log('尝试播放...');
        audio.play();
        playPauseBtn.style.backgroundImage = "url('./img/暂停.png')";
    } else {
        console.log('尝试暂停...');
        audio.pause();
        playPauseBtn.style.backgroundImage = "url('./img/继续播放.png')";
    }
});

// 监听音频加载错误
audio.addEventListener('error', function(e) {
    console.log('音频加载出错！');
    console.log('错误代码：', audio.error ? audio.error.code : '未知');
});

// ========== 新增：播放列表功能 ==========
const listBtn = document.getElementById('list');
const musicListDiv = document.getElementById('music-list');
const closeListDiv = document.getElementById('close-list');

// 打开播放列表
listBtn.addEventListener('click', function() {
    musicListDiv.classList.add('open');
    closeListDiv.classList.add('show');
});

// 关闭播放列表
closeListDiv.addEventListener('click', function() {
    musicListDiv.classList.remove('open');
    closeListDiv.classList.remove('show');
});

const songs = [
    {
        name: "收敛水",
        file: "./mp3/music0.mp3",
        cover: "record0.jpg",
        video: "./mp4/video0.mp4"
    },

    {
        name: "踩脚踏车",
        file: "./mp3/music1.mp3",
        cover: "record1.jpg",
        video: "./mp4/video1.mp4"
    },

    {
        name: "外面有点冷",
        file: "./mp3/music2.mp3",
        cover: "record2.jpg",
        video: "./mp4/video2.mp4"
    },

    {
        name: "史诗",
        file: "./mp3/music3.mp3",
        cover: "record3.jpg",
        video: "./mp4/video3.mp4"
    }
];

let currentIndex = 0;
const musicTitle = document.getElementById('music-title');
const authorName = document.getElementById('author-name');
const recordImg = document.getElementById('record-img');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    musicTitle.textContent = song.name;
    authorName.textContent = "蛋堡";
    recordImg.style.backgroundImage = `url('./img/${song.cover}')`;
    
    if (!audio.paused) {
        audio.play();
    }
    updateListHighlight();
}

function updateListHighlight() {
    const allMusicItems = document.querySelectorAll('.all-list div');
    allMusicItems.forEach((item, i) => {
        if (i === currentIndex) {
            item.style.color = '#ff4d4d';
            item.style.fontWeight = 'bold';
        } else {
            item.style.color = '#ddd';
            item.style.fontWeight = 'normal';
        }
    });
}

// 上一首/下一首
const prevBtn = document.getElementById('skipForward');
const nextBtn = document.getElementById('skipBackward');

prevBtn.addEventListener('click', function() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = songs.length - 1;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.style.backgroundImage = "url('./img/暂停.png')";
});

nextBtn.addEventListener('click', function() {
    currentIndex++;
    if (currentIndex >= songs.length) currentIndex = 0;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.style.backgroundImage = "url('./img/暂停.png')";
});

// 点击列表歌曲切换
const songItems = document.querySelectorAll('.all-list div');
songItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        currentIndex = index;
        loadSong(currentIndex);
        audio.play();
        playPauseBtn.style.backgroundImage = "url('./img/暂停.png')";
        musicListDiv.classList.remove('open');
        closeListDiv.classList.remove('show');
    });
});

// 初始化
playPauseBtn.style.backgroundImage = "url('./img/继续播放.png')";
loadSong(0);

// MV功能
const mvBtn = document.getElementById('MV');

const videoModal = document.getElementById('video-modal');

const mvVideo = document.getElementById('mv-video');

const closeVideo = document.getElementById('close-video');


// 点击MV按钮
mvBtn.addEventListener('click', function() {

        audio.pause();

    const currentSong = songs[currentIndex];

    mvVideo.src = currentSong.video;

    videoModal.classList.add('show');

    mvVideo.play();
    
});


// 关闭MV
closeVideo.addEventListener('click', function() {

    videoModal.classList.remove('show');

    mvVideo.pause();
});


// 音量控制
const volumeSlider = document.getElementById('volumn-togger');

// 默认音量
audio.volume = 0.7;

volumeSlider.addEventListener('input', function () {

    audio.volume = volumeSlider.value / 100;

});

// 倍速功能
const speedBtn = document.getElementById('speed');

const speedList = [1.0, 1.25, 1.5, 2.0];

let speedIndex = 0;

speedBtn.addEventListener('click', function () {

    speedIndex++;

    if (speedIndex >= speedList.length) {
        speedIndex = 0;
    }

    audio.playbackRate = speedList[speedIndex];

    speedBtn.textContent = speedList[speedIndex] + 'X';

});

let playMode = 0;
const playModeBtn = document.getElementById('playMode');

playModeBtn.addEventListener('click', function () {

    playMode++;

    if (playMode > 2) {
        playMode = 0;
    }

    // 切换图标
    if (playMode === 0) {

        playModeBtn.style.backgroundImage =
            "url('./img/mode1.png')";

    } else if (playMode === 1) {

        playModeBtn.style.backgroundImage =
            "url('./img/mode2.png')";

    } else {

        playModeBtn.style.backgroundImage =
            "url('./img/mode3.png')";
    }

});

// 进度条
const progress = document.getElementById('progress');

const progressTotal =
    document.getElementById('progress-total');

const playedTime =
    document.getElementById('playedTime');

const audioTime =
    document.getElementById('audioTime');

    // 时间格式化
function formatTime(time) {

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return (
        String(minutes).padStart(2, '0')
        + ':'
        +
        String(seconds).padStart(2, '0')
    );
}

// 音频加载完成
audio.addEventListener('loadedmetadata', function () {

    audioTime.textContent =
        formatTime(audio.duration);

});

// 播放时更新进度
audio.addEventListener('timeupdate', function () {

    // 当前时间
    playedTime.textContent =
        formatTime(audio.currentTime);

    // 百分比
    const percent =
        (audio.currentTime / audio.duration) * 100;

    // 更新进度条
    progress.style.width = percent + '%';

});

// 点击进度条跳转
progressTotal.addEventListener('click', function (e) {

    // 进度条总宽度
    const width = this.clientWidth;

    // 点击位置
    const clickX = e.offsetX;

    // 计算时间
    const duration = audio.duration;

    audio.currentTime =
        (clickX / width) * duration;

});