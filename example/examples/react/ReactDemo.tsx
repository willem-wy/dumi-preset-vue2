import React, { useState } from 'react';

export default function ReactDemo() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="react-demo">
      <h2>⚛️ Hello from React!</h2>
      <p>这是 React 组件在 Dumi 中的原生渲染</p>
      
      <hr style={{ margin: '20px 0' }} />
      
      <h3>React Hooks 示例</h3>
      <p>当前计数: {count}</p>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#61dafb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        点击 +1
      </button>
      
      {count >= 3 && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: '4px',
            color: '#0d47a1',
          }}
        >
          🎉 太棒了！你点击了 {count} 次！<br />
          Vue 2 和 React 可以在同一个 Dumi 站点中完美共存！
        </div>
      )}
    </div>
  );
}
