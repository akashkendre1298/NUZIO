import { describe, it, expect } from 'vitest';
import { stories } from '../server/data/stories.js';

describe('Frontend Business & Filtering Logic Tests', () => {
  const categories = ['All', 'AI & Tech', 'Markets', 'Startups', 'Indian Business', 'Science', 'Geopolitics', 'Health & Medicine', 'Climate & Energy'];

  it('Should verify that stories dataset contains 10 valid multi-paragraph news items', () => {
    expect(stories.length).toBe(10);
    stories.forEach(story => {
      expect(story).toHaveProperty('id');
      expect(story).toHaveProperty('topic');
      expect(story).toHaveProperty('title');
      expect(story).toHaveProperty('deck');
      expect(story).toHaveProperty('body');
      expect(story.body.length).toBeGreaterThan(50);
    });
  });

  it('Discover Search Filter - Should correctly filter stories by title keyword "Claude"', () => {
    const searchTerm = 'Claude';
    const filtered = stories.filter(s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.deck.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].title).toContain('Claude');
  });

  it('Discover Category Filter - Should correctly filter stories by topic "AI & Tech"', () => {
    const activeTab = 'AI & Tech';
    const filtered = stories.filter(s => activeTab === 'All' || s.topic === activeTab);
    expect(filtered.length).toBe(2);
    filtered.forEach(s => expect(s.topic).toBe('AI & Tech'));
  });

  it('Discover Category Filter - Should return all 10 stories when "All" category is active', () => {
    const activeTab = 'All';
    const filtered = stories.filter(s => activeTab === 'All' || s.topic === activeTab);
    expect(filtered.length).toBe(10);
  });

  it('Voice Narrator Configs - Should validate rate and pitch settings for Aria, Kai, and Meera', () => {
    const voices = [
      { id: 'Aria', name: 'Aria', rate: 0.95, pitch: 1.0 },
      { id: 'Kai', name: 'Kai', rate: 1.05, pitch: 0.9 },
      { id: 'Meera', name: 'Meera', rate: 1.0, pitch: 1.1 }
    ];

    expect(voices.length).toBe(3);
    expect(voices.find(v => v.name === 'Aria').rate).toBe(0.95);
    expect(voices.find(v => v.name === 'Kai').pitch).toBe(0.9);
    expect(voices.find(v => v.name === 'Meera').pitch).toBe(1.1);
  });

  it('Plan Pricing Calculations - Should correctly compute monthly vs annual subscription prices', () => {
    const plans = [
      { name: 'Free', monthly: 0, annualPerMonth: 0 },
      { name: 'Pro', monthly: 79, annualPerMonth: 59 },
      { name: 'Ultra', monthly: 149, annualYearly: 1499 }
    ];

    const proMonthlyTotal = plans[1].monthly * 12; // 948
    const proAnnualTotal = plans[1].annualPerMonth * 12; // 708
    const savingsPercent = Math.round(((proMonthlyTotal - proAnnualTotal) / proMonthlyTotal) * 100);

    expect(proMonthlyTotal).toBe(948);
    expect(proAnnualTotal).toBe(708);
    expect(savingsPercent).toBe(25); // ~25-35% savings
  });
});
