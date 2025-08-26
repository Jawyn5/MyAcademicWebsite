---
title: "TIL: Hugo Backlinks集成测试"
date: 2025-08-26T22:40:00+08:00
author: "Test Author"
description: "测试TIL主题的Backlinks功能集成"
categories: ["Hugo", "TIL", "Web Development"]
tags: ["backlinks", "incoming-links", "til-theme"]
ShowToc: true
---

# Hugo Backlinks功能测试

这是一篇用于测试TIL主题Backlinks功能的文章。

## 功能说明

本文用于测试：
1. **Backlinks显示** - 在文章底部显示相关链接
2. **Incoming Links** - 显示引用当前文章的其他文章
3. **Outgoing Links** - 显示当前文章引用的其他文章  
4. **Related Posts** - 显示相关文章

## Backlinks使用方法

使用 `backlink` shortcode 可以创建文章间的链接关系：

```hugo
{{</* backlink "target-article" "显示文本" */>}}
```

## 测试链接

这里我们引用其他文章来建立outgoing链接：

- 参考文章：{{< backlink "til-categories-test" "TIL Categories功能测试" >}}
- 相关笔记：{{< backlink "til-categories-notes-test" "Categories功能笔记" >}}

## 预期效果

在文章内容下方，应该能看到：
- **Posts部分**：显示相关的博客文章
- **Notes部分**：显示相关的笔记文章
- 每个部分包含：Incoming（引用当前文章的）、Outgoing（当前文章引用的）、Related（相关的）

## 样式测试

这部分内容用于测试backlinks的样式是否正确：

**粗体文本** *斜体文本* `代码内容`

```javascript
// 代码块测试
function testBacklinks() {
  console.log("Testing TIL backlinks integration");
}
```

> 引用文本测试：backlinks功能让文档之间建立了有机的连接关系

1. 有序列表项1
2. 有序列表项2  
3. 有序列表项3

- 无序列表项A
- 无序列表项B
- 无序列表项C

## 总结

Backlinks功能为静态网站带来了类似Wiki或Obsidian的双向链接体验，让知识管理更加高效。
