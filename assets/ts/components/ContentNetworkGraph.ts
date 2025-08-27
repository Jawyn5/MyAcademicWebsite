import { IdType, Network, NodeOptions, type Options } from 'vis-network';
import Graph from '../lib/Graph';
import { GraphData } from '../lib/types';

// 根据当前主题返回适配的配色方案
function getThemeAwareNetworkOptions(): Options {
  const isDarkMode = document.documentElement.classList.contains('dark') || 
                    document.body.classList.contains('dark');
  
  if (isDarkMode) {
    // 深色模式配色
    return {
      nodes: {
        shape: 'dot',
        color: {
          background: '#6b7280', // 更亮的灰色
          border: '#9ca3af', // 更亮的边框
          hover: {
            background: '#60a5fa', // 更亮的蓝色
            border: '#3b82f6'
          }
        },
        font: {
          face: "'LatoLatinWeb', sans-serif",
          color: '#f1f5f9', // 浅色文字，适配深色模式
          size: 11 // 保持TIL原版的字体大小
        },
        scaling: {
          min: 4,
          max: 30
        }
      },
      edges: {
        color: {
          color: '#9ca3af', // 更亮的边线颜色，适配深色模式
          hover: '#60a5fa' // 更亮的hover颜色
        },
        hoverWidth: 0, // 保持TIL原版样式
        smooth: false
      },
      groups: {
        useDefaultGroups: false,
        posts: {},
        notes: {}
      },
      interaction: {
        hover: true
      }
    };
  } else {
    // 浅色模式配色 - 使用TIL主题原始配色
    return {
      nodes: {
        shape: 'dot',
        color: {
          background: '#404040', // TIL原始深灰色节点
          border: '#404040', // TIL原始边框颜色
          hover: {
            background: '#3b82f6', // TIL原始悬停蓝色
            border: '#2563eb'
          }
        },
        font: {
          face: "'LatoLatinWeb', sans-serif",
          color: '#0f172a', // TIL原始深色文字
          size: 11 // TIL原始字体大小
        },
        scaling: {
          min: 4,
          max: 30
        }
      },
      edges: {
        color: {
          color: '#d4d4d4', // TIL原始边线颜色
          hover: '#3b82f6' // TIL原始悬停颜色
        },
        hoverWidth: 0, // TIL原始设置
        smooth: false
      },
      groups: {
        useDefaultGroups: false,
        posts: {},
        notes: {}
      },
      interaction: {
        hover: true
      }
    };
  }
}

function getThemeAwareFadedNodeOptions(): NodeOptions {
  const isDarkMode = document.documentElement.classList.contains('dark') || 
                    document.body.classList.contains('dark');
  
  if (isDarkMode) {
    return {
      color: {
        background: '#4b5563',
        border: '#4b5563'
      },
      font: {
        color: '#9ca3af'
      }
    };
  } else {
    // 浅色模式 - 使用TIL主题原始淡化配色
    return {
      color: {
        background: '#d4d4d4', // TIL原始淡化背景色
        border: '#d4d4d4' // TIL原始淡化边框色
      },
      font: {
        color: '#d4d4d4' // TIL原始淡化文字颜色
      }
    };
  }
}

const OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0.3
};

const SPINNER_SVG = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-5 w-5 opacity-80"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    d="M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53Z"
  >
    <animateTransform
      attributeName="transform"
      dur="0.75s"
      repeatCount="indefinite"
      type="rotate"
      values="0 12 12;360 12 12"
    />
  </path>
</svg>`;

const ERROR_SVG = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  stroke="currentColor" 
  stroke-linecap="round" 
  stroke-linejoin="round" stroke-width="2" 
  class="lucide lucide-circle-x h-5 w-5" 
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="10"/>
  <path d="m15 9-6 6M9 9l6 6"/>
</svg>`;

const EXPAND_SVG = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  stroke="currentColor" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  stroke-width="2" 
  class="lucide lucide-expand h-4 w-4" 
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8M3 16.2V21m0 0h4.8M3 21l6-6M21 7.8V3m0 0h-4.8M21 3l-6 6M3 7.8V3m0 0h4.8M3 3l6 6"/>
</svg>`;

const SHRINK_SVG = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  stroke="currentColor" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  stroke-width="2" 
  class="lucide lucide-shrink h-4 w-4" 
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8M9 19.8V15m0 0H4.2M9 15l-6 6M15 4.2V9m0 0h4.8M15 9l6-6M9 4.2V9m0 0H4.2M9 9 3 3"/>
</svg>`;

export default class ContentNetworkGraph extends HTMLElement {
  private _networkEl: HTMLDivElement;
  private _messageEl: HTMLDivElement;
  private _actionsEl: HTMLUListElement;
  private _network: Network | null = null;
  private _observer: IntersectionObserver | null = null;
  private _themeObserver: MutationObserver | null = null;
  private _heightClass: string;
  private _expanded: boolean = false;
  private _expandedClasslist = [
    'fixed',
    'top-1/2',
    'left-1/2',
    'w-5/6',
    'h-5/6',
    'z-50',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'shadow-lg'
  ];

  constructor() {
    super();
    this._heightClass = Array.from(this.classList).find((cls) => /^h-/.test(cls)) ?? '';
    this.classList.add(
      'relative',
      'border',
      'border-neutral-200',
      'rounded-sm',
      'block',
      'bg-white'
    );
    this._networkEl = document.createElement('div');
    this._messageEl = document.createElement('div');
    this._actionsEl = document.createElement('ul');
    this.replaceChildren(this._networkEl, this._messageEl, this._actionsEl);
    this.observe();
    
    // 监听主题变化
    this._setupThemeObserver();
  }

  disconnectedCallback() {
    this._network?.destroy();
    this._observer?.disconnect();
    this._themeObserver?.disconnect();
  }

  private observe() {
    this._observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        this.load();
      }
    }, OBSERVER_OPTIONS);
    this._observer.observe(this);
  }

  private async load() {
    this._observer?.disconnect();
    this._observer = null;
    this.showLoading();

    try {
      const dataEndpoint = this.getAttribute('data-endpoint') || '/graph/index.json';
      const resp = await fetch(dataEndpoint);
      const graph = new Graph((await resp.json()) as GraphData);
      const permalink = this.getAttribute('page');
      const data = permalink ? graph.dataForPage(permalink) : graph.data();

      this._networkEl.classList.add('h-full', 'w-full');
      this._network = new Network(this._networkEl, data, getThemeAwareNetworkOptions());

      this._network.on('click', (event) => {
        const nodeId = event.nodes.at(0);
        if (nodeId) {
          document.location.href = nodeId;
        }
      });

      this._network.on('hoverNode', (event) => {
        const hoveredNodeId = event.node;
        const connectedNodes = this._network!.getConnectedNodes(hoveredNodeId) as IdType[];
        connectedNodes.push(hoveredNodeId);

        data.nodes.forEach((node) => {
          if (node.id && !connectedNodes.includes(node.id)) {
            data.nodes.update({ id: node.id, ...getThemeAwareFadedNodeOptions() }); // Fade non-connected nodes
          }
        });
      });

      this._network.on('blurNode', function () {
        data.nodes.forEach((node) => {
          data.nodes.update({ id: node.id, ...getThemeAwareNetworkOptions().nodes });
        });
      });

      if (permalink) {
        this._network.focus(permalink);
      }

      this._network.once('stabilized', () => {
        this.showGraph();
      });
    } catch (error) {
      this.showError();
      console.error('error when loading network graph:', error);
    }
  }

  private showLoading() {
    this.showMessage(`${SPINNER_SVG} <span>loading graph…</span>`);
  }

  private showError() {
    this.showMessage(`${ERROR_SVG} <span>failed loading graph</span>`, 'text-red-600');
  }

  private showMessage(html: string, ...addClasses: string[]) {
    this._messageEl.classList.add(
      'message',
      'flex',
      'flex-row',
      'space-x-2',
      'items-center',
      'absolute',
      'bg-white',
      'w-full',
      'h-full',
      'text-lg',
      'font-semibold',
      'italic',
      'justify-center',
      'z-50',
      'transition-opacity',
      ...addClasses
    );
    this._messageEl.innerHTML = html;
  }

  private showGraph() {
    const el = this.querySelector('.message');
    if (el) {
      el.classList.add('opacity-0');
      setTimeout(() => el.remove(), 500);
    }
    this.drawActions();
  }

  private drawActions() {
    this._actionsEl.classList.add(
      'absolute',
      'right-2',
      'top-2',
      'z-50',
      'flex',
      'flex-row',
      'space-x-1',
      'items-center',
      'not-prose'
    );

    const expandBtn = document.createElement('button');
    expandBtn.classList.add(
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-sm',
      'p-2',
      'opacity-80',
      'hover:opacity-100',
      'shadow-sm',
      'hover:shadow-md',
      'transition-all'
    );

    if (this._expanded) {
      expandBtn.title = 'Minimize view';
      expandBtn.innerHTML = SHRINK_SVG;
      expandBtn.addEventListener('click', (event) => {
        event.preventDefault();
        this.contract();
      });
    } else {
      expandBtn.title = 'Expand view';
      expandBtn.innerHTML = EXPAND_SVG;
      expandBtn.addEventListener('click', (event) => {
        event.preventDefault();
        this.expand();
      });
    }

    const li = document.createElement('li');
    li.appendChild(expandBtn);
    this._actionsEl.replaceChildren(li);
  }

  private expand() {
    this.classList.remove('relative', this._heightClass);
    this.classList.add(...this._expandedClasslist);
    this._expanded = true;
    this.drawActions();
    
    // 让网络图适应新尺寸
    if (this._network) {
      setTimeout(() => {
        this._network!.redraw();
        this._network!.fit();
      }, 100);
    }
  }

  private contract() {
    this.classList.remove(...this._expandedClasslist);
    this.classList.add('relative', this._heightClass);
    this._expanded = false;
    this.drawActions();
    
    // 让网络图适应新尺寸
    if (this._network) {
      setTimeout(() => {
        this._network!.redraw();
        this._network!.fit();
      }, 100);
    }
  }
  
  private _setupThemeObserver() {
    // 监听document元素的class变化来检测主题切换
    this._themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // 主题发生变化，更新网络图配色
          this._updateNetworkTheme();
        }
      });
    });
    
    // 同时监听html和body元素的class变化
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    this._themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  private _updateNetworkTheme() {
    if (this._network) {
      // 重新设置网络图的配置
      this._network.setOptions(getThemeAwareNetworkOptions());
      
      // 重新绘制网络图
      this._network.redraw();
    }
  }
}
