import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [input, setInput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [storyboardMode, setStoryboardMode] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsTyping(true);
    setDisplayText('');
    
    const fullText = storyboardMode 
      ? `> ГЕНЕРАЦИЯ РАСКАДРОВКИ...\n\n${input}\n\n[СЦЕНА 1]\nКадр: Общий план\nОписание: ${input.slice(0, 50)}...\n\n[СЦЕНА 2]\nКадр: Крупный план\nДействие: Развитие сюжета\n\n[СЦЕНА 3]\nКадр: Финальная сцена\nРезультат: Завершение\n\n> РАСКАДРОВКА ГОТОВА`
      : `> ОБРАБОТКА ЗАПРОСА...\n\n${input}\n\n> ГЕНЕРАЦИЯ ЗАВЕРШЕНА`;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/3f2f229e-78b1-4d64-970d-27aa0f826355.jpg)',
          filter: 'brightness(0.6) contrast(1.2)',
        }}
      />
      
      <div className="absolute inset-0 scanlines opacity-20" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          <div className="relative bg-gradient-to-b from-[#1a3d1a] to-[#0d1f0d] p-1 shadow-2xl animate-glow-pulse" style={{ borderRadius: '40px' }}>
            <div className="bg-[#001100] border-4 border-[#0f0] shadow-[0_0_40px_rgba(0,255,0,0.5)]" style={{ borderRadius: '38px' }}>
              <div className="bg-gradient-to-b from-[#003300] to-[#001100] px-6 py-3 border-b-2 border-[#0f0]" style={{ borderTopLeftRadius: '36px', borderTopRightRadius: '36px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#0f0] animate-pulse" />
                    <span className="text-[#0f0] text-xl font-bold crt-effect tracking-wider">
                      RETRO TERMINAL v2.0
                    </span>
                  </div>
                  <div className="text-[#0f0] text-sm crt-effect">
                    [{new Date().toLocaleTimeString('ru-RU')}]
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-[#0f0] text-lg crt-effect block">
                    {'>'} ВВЕДИТЕ ЗАПРОС:
                  </Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Начните вводить текст..."
                    className="min-h-[120px] bg-[#001a00] border-2 border-[#0f0] text-[#0f0] text-lg placeholder:text-[#0f0]/40 crt-effect focus:ring-[#0f0] focus:border-[#0f0] resize-none font-mono"
                    disabled={isTyping}
                  />
                </div>

                <div className="flex items-center justify-between bg-[#002200] p-4 rounded border border-[#0f0]/30">
                  <Label htmlFor="storyboard-mode" className="text-[#0f0] text-lg crt-effect cursor-pointer">
                    РЕЖИМ РАСКАДРОВКИ
                  </Label>
                  <Switch
                    id="storyboard-mode"
                    checked={storyboardMode}
                    onCheckedChange={setStoryboardMode}
                    className="data-[state=checked]:bg-[#0f0]"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isTyping || !input.trim()}
                  className="w-full bg-[#0f0] hover:bg-[#0f0]/80 text-[#001100] font-bold text-xl py-6 rounded border-2 border-[#0f0] shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all hover:shadow-[0_0_30px_rgba(0,255,0,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTyping ? '[ ГЕНЕРАЦИЯ... ]' : '[ ЗАПУСТИТЬ ГЕНЕРАЦИЮ ]'}
                </Button>

                {displayText && (
                  <div className="bg-[#000800] p-6 rounded border-2 border-[#0f0] min-h-[300px] relative overflow-hidden">
                    <div className="absolute inset-0 scanlines opacity-20" />
                    <pre className="text-[#0f0] text-base crt-effect whitespace-pre-wrap break-words font-mono relative z-10">
                      {displayText}
                      {isTyping && showCursor && (
                        <span className="inline-block w-2 h-5 bg-[#0f0] ml-1 animate-pulse" />
                      )}
                    </pre>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-t from-[#003300] to-[#001100] px-6 py-3 border-t-2 border-[#0f0]" style={{ borderBottomLeftRadius: '36px', borderBottomRightRadius: '36px' }}>
                <div className="flex items-center justify-between text-[#0f0] text-sm crt-effect">
                  <span>STATUS: READY</span>
                  <span>SYSTEM: ONLINE</span>
                  <span>MODE: {storyboardMode ? 'STORYBOARD' : 'STANDARD'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#0f0] text-sm crt-effect opacity-70">
              RETRO GENERATOR SYSTEM © 2025 • POWERED BY VINTAGE TECHNOLOGY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;