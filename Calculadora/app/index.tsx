import React, { useState } from 'react';
import {
  GluestackUIProvider,
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
  HStack,
  Icon,
} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Plus, Minus, X, Divide, Equal } from 'lucide-react-native';

// O componente principal da nossa aplicação
export default function App() {
  return (
    // O GluestackUIProvider é necessário para que os componentes do gluestack funcionem corretamente
    <GluestackUIProvider config={config}>
      <Calculator />
    </GluestackUIProvider>
  );
}

// Componente da Calculadora com toda a lógica e interface
const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Função para lidar com a entrada de números
  const handleNumberInput = (num) => {
    if (displayValue.length >= 10 && !waitingForSecondOperand) return;
    if (waitingForSecondOperand) {
      setDisplayValue(String(num));
      setWaitingForSecondOperand(false);
    } else {
      // Evita múltiplos zeros no início
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  // Função para lidar com a entrada do ponto decimal
  const handleDecimalInput = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };
  
  // Função para lidar com a troca de sinal (+/-)
  const handleToggleSign = () => {
      setDisplayValue(String(parseFloat(displayValue) * -1));
  };


  // Função para realizar o cálculo
  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        if (second === 0) return 'Error';
        return first / second;
      default:
        return second;
    }
  };

  // Função para lidar com a entrada de operadores
  const handleOperatorInput = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (isNaN(inputValue)) return;

    if (nextOperator === '%') {
      setDisplayValue(String(inputValue / 100));
      return;
    }

    if (nextOperator === '=') {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
      return;
    }

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // Função para limpar tudo (AC) ou apenas a entrada atual (C)
  const handleClear = () => {
    if (displayValue !== '0' && !waitingForSecondOperand) {
        setDisplayValue('0');
    } else {
      setDisplayValue('0');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };
  
  // Layout dos botões da calculadora
  const buttonLayout = [
    [
      { label: displayValue !== '0' && !waitingForSecondOperand ? 'C' : 'AC', handler: handleClear, action: 'secondary' },
      { label: '+/-', handler: handleToggleSign, action: 'secondary' },
      { label: '%', handler: () => handleOperatorInput('%'), action: 'secondary' },
      { label: '÷', handler: () => handleOperatorInput('/'), action: 'primary', icon: Divide },
    ],
    [
      { label: '7', handler: () => handleNumberInput(7) },
      { label: '8', handler: () => handleNumberInput(8) },
      { label: '9', handler: () => handleNumberInput(9) },
      { label: '×', handler: () => handleOperatorInput('*'), action: 'primary', icon: X },
    ],
    [
      { label: '4', handler: () => handleNumberInput(4) },
      { label: '5', handler: () => handleNumberInput(5) },
      { label: '6', handler: () => handleNumberInput(6) },
      { label: '-', handler: () => handleOperatorInput('-'), action: 'primary', icon: Minus },
    ],
    [
      { label: '1', handler: () => handleNumberInput(1) },
      { label: '2', handler: () => handleNumberInput(2) },
      { label: '3', handler: () => handleNumberInput(3) },
      { label: '+', handler: () => handleOperatorInput('+'), action: 'primary', icon: Plus },
    ],
    [
      { label: '0', handler: () => handleNumberInput(0), size: '2' },
      { label: '.', handler: handleDecimalInput },
      { label: '=', handler: () => handleOperatorInput('='), action: 'primary', icon: Equal },
    ],
  ];

  return (
    <Box flex={1} bg="#000000" justifyContent="flex-end" p="$4">
      {/* Visor da Calculadora */}
      <Box alignItems="flex-end" justifyContent="flex-end" p="$8" mb="$4">
        <Text color="$white" fontSize="$8xl" fontWeight="$light" numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </Box>

      {/* Teclado da Calculadora */}
      <VStack space="md">
        {buttonLayout.map((row, rowIndex) => (
          <HStack key={rowIndex} space="md" w="100%">
            {row.map((button) => (
              <CalculatorButton
                key={button.label}
                label={button.label}
                onPress={button.handler}
                action={button.action}
                icon={button.icon}
                flex={button.size === '2' ? 2.1 : 1} // Ajusta o tamanho do botão 0
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

// Componente customizado para os botões, para evitar repetição
const CalculatorButton = ({ label, onPress, action, icon, flex = 1 }) => {
  const getColors = () => {
    switch (action) {
      case 'primary': // Operadores
        return { bg: '#ff9500', color: '$white', pressedBg: '#fca72e' };
      case 'secondary': // Funções especiais (AC, +/-, %)
        return { bg: '#d4d4d2', color: '$black', pressedBg: '#e5e5e4' };
      default: // Números
        return { bg: '#505050', color: '$white', pressedBg: '#7c7c7c' };
    }
  };
  
  const { bg, color, pressedBg } = getColors();

  return (
    <Button
      flex={flex}
      h={80}
      bg={bg}
      borderRadius="$full"
      onPress={onPress}
      sx={{
        ':active': {
          bg: pressedBg,
        },
      }}
    >
      {icon ? (
        <Icon as={icon} color={color} size="xl" />
      ) : (
        <ButtonText color={color} fontSize="$3xl" fontWeight="$medium">
          {label}
        </ButtonText>
      )}
    </Button>
  );
};

