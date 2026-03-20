// DOM元素获取
console.log("✅ script.js 加载成功！");
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const enterExhibition = document.getElementById('enter-exhibition');
const panorama = document.getElementById('panorama');
const panoramaImage = document.querySelector('.panorama-image');
const closeBtn = document.querySelector('.close-btn');
const markers = document.querySelectorAll('.marker');
const markerInfo = document.getElementById('marker-info');
const closeInfo = document.querySelector('.close-info');
const brickDoll = document.getElementById('brick-doll');
const knowledgePopup = document.getElementById('knowledge-popup');
const knowledgeContent = document.getElementById('knowledge-content');
const closeKnowledge = document.querySelector('.close-knowledge');
const guidePopup = document.getElementById('guide-popup');
const guideContent = document.getElementById('guide-content');
const closeGuide = document.querySelector('.close-guide');
const backToTop = document.getElementById('back-to-top');

// 导航栏切换
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 360°全景展厅
let isDragging = false;
let startX = 0;
let currentPosition = 0;

enterExhibition.addEventListener('click', () => {
    panorama.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    panorama.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// 鼠标拖动全景
panoramaImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

panoramaImage.addEventListener('mouseleave', () => {
    isDragging = false;
});

panoramaImage.addEventListener('mouseup', () => {
    isDragging = false;
});

panoramaImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    currentPosition += deltaX;
    // 限制拖动范围，确保全景图始终可见
    const maxPosition = panoramaImage.offsetWidth - window.innerWidth;
    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < -maxPosition) currentPosition = -maxPosition;
    panoramaImage.style.transform = `translateX(${currentPosition}px)`;
    startX = e.clientX;
});

// 触摸拖动全景
panoramaImage.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

panoramaImage.addEventListener('touchend', () => {
    isDragging = false;
});

panoramaImage.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    currentPosition += deltaX;
    // 限制拖动范围，确保全景图始终可见
    const maxPosition = panoramaImage.offsetWidth - window.innerWidth;
    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < -maxPosition) currentPosition = -maxPosition;
    panoramaImage.style.transform = `translateX(${currentPosition}px)`;
    startX = e.touches[0].clientX;
});

// 标注点点击事件
markers.forEach(marker => {
    marker.addEventListener('click', () => {
        const info = JSON.parse(marker.dataset.info);
        document.getElementById('info-title').textContent = info.title;
        document.getElementById('info-description').textContent = info.description;
        markerInfo.classList.add('active');
    });
});

closeInfo.addEventListener('click', () => {
    markerInfo.classList.remove('active');
});

// 砖雕小知识
const knowledgeList = [
    '临夏砖雕是中国非物质文化遗产之一。',
    '砖雕制作需要经过36道工序，每一道都需要精心操作。',
    '临夏砖雕与徽州砖雕并称中国砖雕艺术的南北双绝。',
    '砖雕作品通常采用青砖作为材料，因为青砖质地细腻，适合雕刻。',
    '传统砖雕技艺主要通过师徒传承的方式传递。',
    '临夏砖雕的题材广泛，包括人物、花卉、动物等。',
    '砖雕作品在建筑中主要用于装饰墙壁、门窗、屋脊等部位。',
    '现代砖雕艺术家正在探索将传统工艺与现代设计相结合的新途径。'
];

// 可互动砖雕小人
// 原始的点击事件功能
let isReading = false; // 跟踪是否已经开始朗读
let currentReadingIndex = 0; // 跟踪当前朗读的段落索引
let paragraphs = []; // 保存段落列表

if (brickDoll) {
    // 确保砖雕小人始终可见
    brickDoll.style.display = 'block';
    brickDoll.style.zIndex = '9999';
    
    // 添加点击事件监听器
    brickDoll.addEventListener('click', (e) => {
        // 阻止默认行为和事件冒泡
        e.preventDefault();
        e.stopPropagation();
        
        console.log('砖雕小人被点击了！');
        
        // 显示砖雕小知识
        const randomKnowledge = knowledgeList[Math.floor(Math.random() * knowledgeList.length)];
        knowledgeContent.textContent = randomKnowledge;
        
        // 移除内联样式，确保类能够正常工作
        knowledgePopup.style.display = '';
        // 添加active类显示弹窗
        knowledgePopup.classList.add('active');
        
        // 确保知识弹窗可见
        knowledgePopup.style.zIndex = '1100';
        
        // 只有第一次点击时才执行朗读功能
        if (!isReading) {
            isReading = true;
            // 执行朗读功能
            readAndHighlight();
        }
    });
}

closeKnowledge.addEventListener('click', (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    console.log('关闭按钮被点击了！');
    knowledgePopup.classList.remove('active');
    // 移除内联样式，让CSS类控制显示
    knowledgePopup.style.display = '';
});

// 拖动砖雕小人
let isDraggingDoll = false;
let dollStartX = 0;
let dollStartY = 0;

brickDoll.addEventListener('mousedown', (e) => {
    isDraggingDoll = true;
    dollStartX = e.clientX - brickDoll.getBoundingClientRect().left;
    dollStartY = e.clientY - brickDoll.getBoundingClientRect().top;
    // 阻止model-viewer的默认行为
    e.stopPropagation();
});

window.addEventListener('mouseup', () => {
    isDraggingDoll = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDraggingDoll) return;
    e.preventDefault();
    
    // 计算新位置
    let x = e.clientX - dollStartX;
    let y = e.clientY - dollStartY;
    
    // 获取小人尺寸
    const dollWidth = brickDoll.offsetWidth;
    const dollHeight = brickDoll.offsetHeight;
    
    // 计算边界限制
    const maxX = window.innerWidth - dollWidth;
    const maxY = window.innerHeight - dollHeight;
    
    // 限制位置在可视区域内
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    brickDoll.style.left = `${x}px`;
    brickDoll.style.top = `${y}px`;
    brickDoll.style.bottom = 'auto';
    brickDoll.style.right = 'auto';
});

// 触摸拖动砖雕小人
brickDoll.addEventListener('touchstart', (e) => {
    isDraggingDoll = true;
    dollStartX = e.touches[0].clientX - brickDoll.getBoundingClientRect().left;
    dollStartY = e.touches[0].clientY - brickDoll.getBoundingClientRect().top;
    // 阻止model-viewer的默认行为
    e.stopPropagation();
});

window.addEventListener('touchend', () => {
    isDraggingDoll = false;
});

window.addEventListener('touchmove', (e) => {
    if (!isDraggingDoll) return;
    e.preventDefault();
    
    // 计算新位置
    let x = e.touches[0].clientX - dollStartX;
    let y = e.touches[0].clientY - dollStartY;
    
    // 获取小人尺寸
    const dollWidth = brickDoll.offsetWidth;
    const dollHeight = brickDoll.offsetHeight;
    
    // 计算边界限制
    const maxX = window.innerWidth - dollWidth;
    const maxY = window.innerHeight - dollHeight;
    
    // 限制位置在可视区域内
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    brickDoll.style.left = `${x}px`;
    brickDoll.style.top = `${y}px`;
    brickDoll.style.bottom = 'auto';
    brickDoll.style.right = 'auto';
});

// 页面滚动时的引导
const sections = document.querySelectorAll('.section');
let currentSection = '';

window.addEventListener('scroll', () => {
    // 显示/隐藏回到顶部按钮
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // 检测当前滚动到的板块
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            if (currentSection !== section.id) {
                currentSection = section.id;
                showGuide(currentSection);
            }
        }
    });
});

// 显示引导信息
function showGuide(sectionId) {
    let guideText = '';
    switch (sectionId) {
        case 'history':
            guideText = '这里介绍了临夏砖雕的历史渊源，从秦汉起源到明清鼎盛，展现了砖雕艺术的发展历程。';
            break;
        case 'craftsman':
            guideText = '这里展示了临夏砖雕的工匠精神，包括36道工序、选料、制坯、画稿、雕刻、打磨等环节。';
            break;
        case 'works':
            guideText = '这里展示了临夏砖雕的代表作品，包括红园、东公馆、八坊十三巷等，以及经典纹样。';
            break;
        case 'heritage':
            guideText = '这里介绍了临夏砖雕的传承与创新，包括师徒传承、学校教育、文创产品、3D扫描数字化等。';
            break;
        case 'contact':
            guideText = '这里提供了联系我们的方式，欢迎您了解更多关于临夏砖雕的信息。';
            break;
        default:
            guideText = '';
    }

    if (guideText) {
        guideContent.textContent = guideText;
        guidePopup.classList.add('active');
        
        // 自动关闭引导弹窗
        setTimeout(() => {
            guidePopup.classList.remove('active');
        }, 5000);
    }
}

closeGuide.addEventListener('click', () => {
    guidePopup.classList.remove('active');
});

// 回到顶部按钮
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // 关闭移动导航菜单
            navLinks.classList.remove('active');
        }
    });
});

// 作品卡片交互功能（合并翻转和放大）
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');
const workCards = document.querySelectorAll('.work-card');

// 为每个作品卡片添加点击事件
workCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. 执行3D翻转显示简介
        card.classList.toggle('flipped');
        
        // 2. 执行放大对应作品图片
        const cardImage = card.querySelector('.card-image');
        const imageUrl = window.getComputedStyle(cardImage).backgroundImage;
        // 提取URL
        const url = imageUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        
        // 设置模态框图片
        modalImage.src = url;
        // 显示模态框
        imageModal.style.display = 'block';
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    });
});

// 关闭模态框
closeModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击模态框背景关闭
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    // 初始化页面
    console.log('临夏砖雕网页加载完成');
    
    // 预加载语音列表
    window.speechSynthesis.getVoices();
});

// 监听语音加载完成事件
window.speechSynthesis.onvoiceschanged = function() {
    console.log('语音列表加载完成');
};

// 页面卸载时停止朗读
window.addEventListener('beforeunload', () => {
    // 停止语音合成
    window.speechSynthesis.cancel();
    // 重置朗读状态
    isReading = false;
});

// 页面隐藏时停止朗读（当用户切换标签页或最小化浏览器时）
window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时停止朗读，但不重置朗读状态
        window.speechSynthesis.cancel();
    } else {
        // 页面重新显示时，如果之前正在朗读，继续朗读
        if (isReading && paragraphs.length > 0 && currentReadingIndex < paragraphs.length) {
            // 重新执行朗读功能，从当前索引开始
            readAndHighlight();
        }
    }
});

// 网页朗读 + 自动高亮
function readAndHighlight() {
  // 找到页面里所有正文段落（section 和 .card 下的 p 标签）
  paragraphs = document.querySelectorAll("section p, .card p");

  if (paragraphs.length === 0) {
    alert("没找到可朗读的正文内容哦！");
    return;
  }

  const synth = window.speechSynthesis;

  // 停止之前可能在播放的语音
  synth.cancel();

  // 核心：逐段朗读 + 移动数字人
  function readNext() {
    // 读完所有段落就停止
    if (currentReadingIndex >= paragraphs.length) {
      document.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));
      // 重置朗读状态，允许再次点击开始朗读
      isReading = false;
      currentReadingIndex = 0;
      return;
    }

    // 1. 先拿到当前要读的段落
    const el = paragraphs[currentReadingIndex];

    // 2. 让小人跟着当前朗读段落移动
    const doll = document.getElementById('brick-doll');
    if (doll) {
      const rect = el.getBoundingClientRect();
      
      // 计算小人位置，使其位于当前朗读段落的旁边
      // 水平位置：段落右侧
      // 垂直位置：段落中心
      let newLeft = rect.left + rect.width + 10; // 段落右侧10px
      let newTop = rect.top + window.scrollY + rect.height / 2 - doll.offsetHeight / 2; // 垂直居中
      
      // 获取小人尺寸
      const dollWidth = doll.offsetWidth;
      const dollHeight = doll.offsetHeight;
      
      // 计算边界限制
      const maxX = window.innerWidth - dollWidth;
      const maxY = window.innerHeight - dollHeight;
      
      // 限制位置在可视区域内
      newLeft = Math.max(0, Math.min(newLeft, maxX));
      newTop = Math.max(0, Math.min(newTop, maxY));
      
      doll.style.position = 'fixed';
      doll.style.left = `${newLeft}px`;
      doll.style.top = `${newTop}px`;
      doll.style.bottom = 'auto';
      doll.style.right = 'auto';
      // 确保小人始终可见
      doll.style.display = 'block';
      doll.style.zIndex = '9999';
    }

    // 4. 原来的朗读 + 高亮逻辑
    const text = el.innerText.trim();
    
    // 先滚动到段落
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 清除所有高亮
    document.querySelectorAll(".highlight").forEach(e => e.classList.remove("highlight"));
    
    // 立即添加高亮
    el.classList.add("highlight");
    
    // 强制浏览器重排，确保高亮立即显示
    el.offsetHeight; // 触发重排
    
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN";
    utter.rate = 1.0; // 正常语速
    utter.pitch = 1.0; // 正常音调
    utter.volume = 1.0; // 正常音量
    
    // 尝试使用更自然的语音合成器
    const voices = window.speechSynthesis.getVoices();
    // 找到中文语音
    const chineseVoice = voices.find(voice => voice.lang === 'zh-CN' || voice.lang === 'zh');
    if (chineseVoice) {
      utter.voice = chineseVoice;
    }

    utter.onend = () => {
      el.classList.remove("highlight");
      currentReadingIndex++;
      readNext(); // 读完自动读下一段
    };
    
    // 立即开始朗读，不需要延迟
    synth.speak(utter);
  }

  // 开始朗读
  readNext();
}

// 朗读功能已经在上面的点击事件监听器中处理，不需要重复添加