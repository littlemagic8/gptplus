/**
 * main-header.js — 全站统一导航栏
 *
 * 用法：
 *   1. <link rel="stylesheet" href="main-header.css">
 *   2. 页面 body 内放置：<div id="main-header-placeholder"></div>
 *   3. <script src="main-header.js"></script>
 *
 * 可选：在 placeholder 前放页面专属顶部公告条，并用 CSS 设置 --notice-bar-height。
 */
(function () {
  'use strict';

  var HEADER_HTML = [
    '<header class="main-header">',
    '  <div class="container header-container">',
    '    <a href="index.html" class="logo-container">',
    '      <div class="logo">AI</div>',
    '      <div class="logo-text">',
    '        <h1>AI Pro Service</h1>',
    '        <span class="subtitle">GPT/Claude/Gemini/Perplexity 充值</span>',
    '      </div>',
    '    </a>',
    '    <div class="desktop-nav">',
    '      <nav class="main-nav">',
    '        <ul>',
    '          <li><a href="index.html" data-nav="index"><i class="fa-solid fa-house"></i> 首页</a></li>',
    '          <li><a href="https://littlemagic8.github.io/buychat/" class="nav-highlight" data-nav="share"><i class="fa-solid fa-bolt"></i> 共享账号</a></li>',
    '          <li><a href="purchase-gpt.html" class="nav-highlight" data-nav="gpt"><i class="fa-solid fa-book-open"></i> ChatGPT</a></li>',
    '          <li><a href="purchase-claude.html" class="nav-highlight" data-nav="claude"><i class="fa-solid fa-right-to-bracket"></i> Claude Pro</a></li>',
    '          <li><a href="purchase-gemini.html" class="nav-highlight" data-nav="gemini"><i class="fa-solid fa-star"></i> Gemini</a></li>',
    '          <li><a href="purchase-grok.html" class="nav-highlight" data-nav="grok"><i class="fa-solid fa-bolt"></i> SuperGrok</a></li>',
    '          <li><a href="purchase-perplexity.html" class="nav-highlight" data-nav="perplexity"><i class="fa-solid fa-lightbulb"></i> Perplexity Pro</a></li>',
    '          <li><a href="purchase-premium.html" class="nav-highlight" data-nav="premium"><i class="fa-solid fa-crown"></i> X Premium(+)</a></li>',
    '          <li class="nav-more-item" style="display: none;">',
    '            <a href="#">更多 <i class="fa-solid fa-chevron-down"></i></a>',
    '            <ul class="nav-more-list"></ul>',
    '          </li>',
    '        </ul>',
    '      </nav>',
    '      <div class="user-actions">',
    '        <a href="https://fe.dtyuedan.cn/order" target="_blank" class="query-btn"><i class="fa-solid fa-list-check"></i> 查询订单</a>',
    '        <div class="more-services">',
    '          <div class="more-services-btn">',
    '            <span>更多服务</span> <i class="fa-solid fa-chevron-down"></i>',
    '          </div>',
    '          <div class="dropdown-content">',
    '            <p>其它主流/非主流AI服务均可代充，<br>需要请联系微信：<span class="wechat-id">aicygg888</span> / <span class="wechat-id">aicygg789</span></p>',
    '            <img src="https://picx.zhimg.com/80/v2-46f7cfd62d1e94381388ab08b0fea3af_720w.png" alt="微信二维码">',
    '          </div>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <button class="mobile-nav-toggle" aria-label="Toggle navigation" type="button">',
    '      <i class="fa-solid fa-bars"></i>',
    '    </button>',
    '    <div class="mobile-nav-menu"></div>',
    '  </div>',
    '</header>'
  ].join('\n');

  function getCurrentPage() {
    var path = (window.location.pathname || '').split('/').pop() || 'index.html';
    path = path.toLowerCase();
    if (!path || path === '' || path === '/') return 'index.html';
    return path;
  }

  function markActiveNav(root) {
    var page = getCurrentPage();
    var links = root.querySelectorAll('.main-nav a[href]');
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (!href || href.startsWith('http') || href === '#') return;
      var file = href.split('/').pop().split('?')[0].split('#')[0];
      if (file === page) {
        a.classList.add('nav-active');
      }
    });
  }

  function initializeHeader(root) {
    var mobileNavToggle = root.querySelector('.mobile-nav-toggle');
    var mobileNavMenu = root.querySelector('.mobile-nav-menu');
    var desktopNav = root.querySelector('.desktop-nav');
    var mainNavList = root.querySelector('.main-nav > ul');

    if (!desktopNav || !mobileNavMenu || !mainNavList) return;

    // 填充移动端菜单
    var navContent = desktopNav.innerHTML;
    mobileNavMenu.innerHTML = navContent;
    var mobileUserActions = mobileNavMenu.querySelector('.user-actions');
    var mobileNavList = mobileNavMenu.querySelector('.main-nav ul');
    if (mobileUserActions && mobileNavList) {
      var actionsClone = mobileUserActions.cloneNode(true);
      actionsClone.classList.add('user-actions-mobile');
      mobileNavList.appendChild(actionsClone);
      mobileUserActions.remove();
    }

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function () {
        mobileNavMenu.classList.toggle('active');
      });
    }

    var allNavItems = Array.from(mainNavList.querySelectorAll('li:not(.nav-more-item)'));
    var moreItem = root.querySelector('.nav-more-item');
    var moreList = root.querySelector('.nav-more-list');

    function updateDesktopNav() {
      if (!moreItem || !moreList || !desktopNav) return;

      if (window.innerWidth <= 1024) {
        moreItem.style.display = 'none';
        return;
      }

      moreList.innerHTML = '';
      allNavItems.forEach(function (item) {
        mainNavList.insertBefore(item, moreItem);
      });
      moreItem.style.display = 'none';

      var isOverflowing = desktopNav.scrollWidth > desktopNav.clientWidth;
      if (isOverflowing) {
        moreItem.style.display = 'flex';
        isOverflowing = desktopNav.scrollWidth > desktopNav.clientWidth;
      }

      var i = allNavItems.length - 1;
      while (isOverflowing && i >= 0) {
        var itemToMove = allNavItems[i];
        if (itemToMove.parentNode === mainNavList) {
          moreList.prepend(itemToMove);
        }
        isOverflowing = desktopNav.scrollWidth > desktopNav.clientWidth;
        i--;
      }
    }

    function handleResize() {
      updateDesktopNav();
      if (window.innerWidth > 1024) {
        mobileNavMenu.classList.remove('active');
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  }

  function mount() {
    var placeholder = document.getElementById('main-header-placeholder');
    if (!placeholder) {
      console.warn('[main-header] #main-header-placeholder not found');
      return;
    }

    placeholder.outerHTML = HEADER_HTML;

    var header = document.querySelector('header.main-header');
    if (!header) return;

    markActiveNav(header);
    initializeHeader(header);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
