import React, { Component } from 'react';
import { createElement, render, renderDom } from './Element';
import diff from './Diff';
import patch from './Patch';


class App extends Component {

  componentDidMount() {
    let virtualDom = createElement('ul', {class: 'list'}, [
      createElement('li', {class: 'item'}, ['周杰伦']),
      createElement('li', {class: 'item'}, ['林俊杰']),
      createElement('li', {class: 'item'}, ['王力宏'])
    ]);
    
    let virtualDom2 = createElement('ul', { class: 'list-group' }, [
      createElement('li', { class: 'item' }, ['1']),
      createElement('li', { class: 'item' }, ['b']),
      createElement('p', {class: 'page'}, [
          createElement('a', {class:'link', href: 'https://www.so.com/', target: '_blank'}, ['so'])
      ]),
      createElement('li', {class: 'wkk'}, ['wkk'])
    ]);

    // 渲染虚拟DOM得到真实的DOM结构
    let el = render(virtualDom);
    console.log('el', el);

    setTimeout(() => {
      let virtualDom3 = createElement('ul', {class: 'list-group'}, [
        createElement('li', {class: 'item active'}, ['七里香']),
        createElement('li', {class: 'item'}, ['一千年以后']),
        createElement('li', {class: 'item'}, ['需要人陪'])    
      ]);

      let patches = diff(virtualDom, virtualDom3);
      console.log('patches', patches);

      // 给元素打补丁，重新更新视图
      patch(el, patches);
    }, 5000)

    // 直接将DOM添加到页面内
    renderDom(el, document.getElementById('root'));
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header" style={{ textAlign: 'center'}}>记录一次虚拟dom的实现</h1>
      </div>
    );
  }
}

export default App;
