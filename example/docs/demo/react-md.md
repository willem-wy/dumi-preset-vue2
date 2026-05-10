---
title: md文档书写react组件
order: 5
---

# md文档书写react组件

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
export default function ReactDemo(){
  const [count, setCount] = useState(0)
  return (<div>
    <div>count: {count}</div>
    <Button onClick={() => setCount(count + 1)}>count++</Button>
  </div>)
}
```

