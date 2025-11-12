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
        <div className="w-full max-w-2xl">
          <div className="relative bg-gradient-to-b from-[#0a2a0a] to-[#051505] p-1 shadow-2xl" style={{ borderRadius: '40px' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" style={{ borderRadius: '40px' }} />
            <div className="bg-[#001100] border-2 border-[#0a4d0a] shadow-[0_0_15px_rgba(0,255,0,0.2)] relative" style={{ borderRadius: '38px' }}>
              <div className="bg-gradient-to-b from-[#002a00] to-[#001100] px-4 py-2 border-b border-[#0a4d0a]" style={{ borderTopLeftRadius: '36px', borderTopRightRadius: '36px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0f0] opacity-60" />
                    <span className="text-[#0f0] text-base font-bold crt-effect tracking-wider opacity-80">
                      RETRO TERMINAL v2.0
                    </span>
                  </div>
                  <div className="text-[#0f0] text-xs crt-effect opacity-60">
                    [{new Date().toLocaleTimeString('ru-RU')}]
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#0f0] text-sm crt-effect block opacity-80">
                    {'>'} ВВЕДИТЕ ЗАПРОС:
                  </Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Начните вводить текст..."
                    className="min-h-[80px] bg-[#001a00] border border-[#0a4d0a] text-[#0f0] text-sm placeholder:text-[#0f0]/30 crt-effect focus:ring-1 focus:ring-[#0a4d0a] focus:border-[#0a4d0a] resize-none font-mono"
                    disabled={isTyping}
                  />
                </div>

                <div className="flex items-center justify-between bg-[#001a00] p-3 rounded border border-[#0a4d0a]/50">
                  <Label htmlFor="storyboard-mode" className="text-[#0f0] text-sm crt-effect cursor-pointer opacity-80">
                    РЕЖИМ РАСКАДРОВКИ
                  </Label>
                  <Switch
                    id="storyboard-mode"
                    checked={storyboardMode}
                    onCheckedChange={setStoryboardMode}
                    className="data-[state=checked]:bg-[#0a4d0a]"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isTyping || !input.trim()}
                  className="w-full bg-[#0a4d0a] hover:bg-[#0f0]/20 text-[#0f0] font-bold text-base py-4 rounded border border-[#0a4d0a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTyping ? '[ ГЕНЕРАЦИЯ... ]' : '[ ЗАПУСТИТЬ ГЕНЕРАЦИЮ ]'}
                </Button>

                {displayText && (
                  <div className="bg-[#000800] p-4 rounded border border-[#0a4d0a] min-h-[200px] relative overflow-hidden">
                    <div className="absolute inset-0 scanlines opacity-10" />
                    <pre className="text-[#0f0] text-sm crt-effect whitespace-pre-wrap break-words font-mono relative z-10 opacity-90">
                      {displayText}
                      {isTyping && showCursor && (
                        <span className="inline-block w-1.5 h-4 bg-[#0f0] ml-1 opacity-80" />
                      )}
                    </pre>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-t from-[#002a00] to-[#001100] px-4 py-2 border-t border-[#0a4d0a]" style={{ borderBottomLeftRadius: '36px', borderBottomRightRadius: '36px' }}>
                <div className="flex items-center justify-between text-[#0f0] text-xs crt-effect opacity-60">
                  <span>STATUS: READY</span>
                  <span>SYSTEM: ONLINE</span>
                  <span>MODE: {storyboardMode ? 'STORYBOARD' : 'STANDARD'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[#0f0] text-xs crt-effect opacity-50">
              RETRO GENERATOR SYSTEM © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;