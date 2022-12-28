---
title: 简单使用
nav:
  title: 示例
---

```tsx
/**
 * compact: true
 */
import { L7Studio } from 'l7-studio';

export default () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: '#fff',
    }}
  >
    <L7Studio title="Hello dumi!" />
  </div>
);
```
