import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface CodeBlockProps {
  code: string;
}

// Simple tokenizer for basic JS syntax highlighting
function tokenize(code: string): Array<{ text: string; type: string }> {
  const tokens: Array<{ text: string; type: string }> = [];

  const patterns: Array<{ regex: RegExp; type: string }> = [
    { regex: /\/\/[^\n]*/g, type: 'comment' },
    { regex: /`[^`]*`/g, type: 'template' },
    { regex: /"[^"]*"/g, type: 'string' },
    { regex: /'[^']*'/g, type: 'string' },
    { regex: /\b(class|extends|new|constructor|super|return|this|static|get|set|const|let|var|function|if|else|throw|async|await|for|of|forEach|throw|try|catch)\b/g, type: 'keyword' },
    { regex: /\b(true|false|null|undefined|Math|console|Promise|Error|Array|Object|Number|String|Boolean|new\.target)\b/g, type: 'builtin' },
    { regex: /\b\d+(\.\d+)?\b/g, type: 'number' },
  ];

  // Build a map of positions to token types
  const markedPositions: Array<{ start: number; end: number; type: string; text: string }> = [];

  for (const { regex, type } of patterns) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      // Make sure no overlap
      const overlaps = markedPositions.some(
        (p) => start < p.end && end > p.start
      );
      if (!overlaps) {
        markedPositions.push({ start, end, type, text: match[0] });
      }
    }
  }

  // Sort by position
  markedPositions.sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  for (const { start, end, type, text } of markedPositions) {
    if (start > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, start), type: 'plain' });
    }
    tokens.push({ text, type });
    lastIndex = end;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: 'plain' });
  }

  return tokens;
}

const tokenColors: Record<string, string> = {
  keyword: '#C678DD',
  builtin: '#61AFEF',
  string: '#98C379',
  template: '#E5C07B',
  comment: '#5C6370',
  number: '#D19A66',
  plain: '#ABB2BF',
};

export default function CodeBlock({ code }: CodeBlockProps) {
  const tokens = tokenize(code);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: '#FF5F57' }]} />
        <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
        <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
        <Text style={styles.lang}>javascript</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.code} selectable>
          {tokens.map((token, i) => (
            <Text key={i} style={{ color: tokenColors[token.type] ?? '#ABB2BF' }}>
              {token.text}
            </Text>
          ))}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#313244',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#181825',
    borderBottomWidth: 1,
    borderBottomColor: '#313244',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  lang: {
    color: '#6C7086',
    fontSize: 11,
    fontFamily: 'monospace',
    marginLeft: 'auto',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    padding: 14,
    color: '#ABB2BF',
  },
});
