export interface CodeExample {
  language: string;
  code: string;
}

export interface ContentSection {
  type: 'text' | 'code' | 'tip' | 'heading';
  value: string;
}

export interface OopModule {
  id: number;
  title: string;
  shortDescription: string;
  icon: string;
  accentColor: string;
  gradientColors: [string, string];
  durationMinutes: number;
  sections: ContentSection[];
}

export const OOP_MODULES: OopModule[] = [
  {
    id: 1,
    title: 'Introducción a la POO',
    shortDescription: 'Descubre los fundamentos y pilares de la programación orientada a objetos.',
    icon: '🧩',
    accentColor: '#7C3AED',
    gradientColors: ['#7C3AED', '#4F46E5'],
    durationMinutes: 8,
    sections: [
      { type: 'heading', value: '¿Qué es la POO?' },
      {
        type: 'text',
        value:
          'La Programación Orientada a Objetos (POO) es un paradigma de programación que organiza el código en torno a "objetos" — entidades que combinan datos y comportamiento. En lugar de escribir funciones sueltas, agrupamos todo lo relacionado dentro de una unidad lógica.',
      },
      { type: 'heading', value: 'Los 4 Pilares de la POO' },
      {
        type: 'text',
        value:
          '🔒 Encapsulamiento — Ocultar los detalles internos y exponer solo lo necesario.\n\n🏗️ Herencia — Crear nuevas clases basadas en clases existentes.\n\n🎭 Polimorfismo — Un mismo método se comporta diferente según el objeto.\n\n🎯 Abstracción — Simplificar la complejidad exponiendo solo lo esencial.',
      },
      { type: 'heading', value: 'El mundo real en código' },
      {
        type: 'text',
        value:
          'Imagina un auto 🚗. Tiene propiedades (color, marca, velocidad) y comportamientos (acelerar, frenar). En POO, modelamos esto con una clase.',
      },
      {
        type: 'code',
        value: `// Un auto como objeto en JavaScript
const miAuto = {
  marca: 'Toyota',
  color: 'Rojo',
  velocidad: 0,
  
  acelerar(cantidad) {
    this.velocidad += cantidad;
    console.log(\`Velocidad: \${this.velocidad} km/h\`);
  },
  
  frenar() {
    this.velocidad = 0;
    console.log('Auto detenido');
  }
};

miAuto.acelerar(60); // Velocidad: 60 km/h
miAuto.frenar();     // Auto detenido`,
      },
      {
        type: 'tip',
        value:
          '💡 La POO nos ayuda a escribir código más organizado, reutilizable y fácil de mantener.',
      },
    ],
  },
  {
    id: 2,
    title: 'Clases y Objetos',
    shortDescription: 'Aprende a definir clases y crear instancias de objetos en JavaScript.',
    icon: '🏛️',
    accentColor: '#0EA5E9',
    gradientColors: ['#0EA5E9', '#0284C7'],
    durationMinutes: 10,
    sections: [
      { type: 'heading', value: '¿Qué es una Clase?' },
      {
        type: 'text',
        value:
          'Una clase es como un molde o plantilla. Define la estructura y el comportamiento que tendrán todos los objetos creados a partir de ella. En JavaScript usamos la palabra clave `class`.',
      },
      { type: 'heading', value: 'Sintaxis básica de una clase' },
      {
        type: 'code',
        value: `// Definir una clase
class Animal {
  // Propiedades y métodos van aquí
}

// Crear instancias (objetos) de la clase
const perro = new Animal();
const gato = new Animal();

console.log(perro); // Animal {}
console.log(gato);  // Animal {}`,
      },
      { type: 'heading', value: 'Clase con propiedades y métodos' },
      {
        type: 'code',
        value: `class Persona {
  nombre = 'Sin nombre';
  edad = 0;
  
  saludar() {
    console.log(\`Hola, soy \${this.nombre} y tengo \${this.edad} años\`);
  }
}

const persona1 = new Persona();
persona1.nombre = 'Ana';
persona1.edad = 25;
persona1.saludar(); // Hola, soy Ana y tengo 25 años

const persona2 = new Persona();
persona2.nombre = 'Luis';
persona2.edad = 30;
persona2.saludar(); // Hola, soy Luis y tengo 30 años`,
      },
      { type: 'heading', value: 'Clase vs Objeto' },
      {
        type: 'text',
        value:
          '• Clase → El plano del arquitecto 📐\n• Objeto → La casa construida 🏠\n\nPuedes crear muchas casas (objetos) del mismo plano (clase), cada una independiente.',
      },
      {
        type: 'tip',
        value:
          '💡 Cada objeto creado con `new` es una instancia independiente. Modificar uno no afecta a los demás.',
      },
    ],
  },
  {
    id: 3,
    title: 'Constructor y Propiedades',
    shortDescription: 'Usa el constructor para inicializar objetos con valores únicos al crearlos.',
    icon: '⚙️',
    accentColor: '#10B981',
    gradientColors: ['#10B981', '#059669'],
    durationMinutes: 12,
    sections: [
      { type: 'heading', value: '¿Qué es el Constructor?' },
      {
        type: 'text',
        value:
          'El constructor es un método especial que se ejecuta automáticamente cuando creamos un nuevo objeto con `new`. Es el lugar ideal para asignar valores iniciales a las propiedades.',
      },
      { type: 'heading', value: 'Definir un constructor' },
      {
        type: 'code',
        value: `class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  
  mostrarInfo() {
    console.log(\`\${this.nombre} - $\${this.precio} (stock: \${this.stock})\`);
  }
}

const laptop = new Producto('Laptop', 1200, 5);
const mouse = new Producto('Mouse', 25, 20);

laptop.mostrarInfo(); // Laptop - $1200 (stock: 5)
mouse.mostrarInfo();  // Mouse - $25 (stock: 20)`,
      },
      { type: 'heading', value: 'Valores por defecto' },
      {
        type: 'code',
        value: `class Usuario {
  constructor(nombre, rol = 'visitante', activo = true) {
    this.nombre = nombre;
    this.rol = rol;
    this.activo = activo;
    this.fechaCreacion = new Date();
  }
}

const admin = new Usuario('Ana', 'admin');
const visitante = new Usuario('Bob');

console.log(admin.rol);      // admin
console.log(visitante.rol);  // visitante`,
      },
      { type: 'heading', value: 'La palabra clave `this`' },
      {
        type: 'text',
        value:
          '`this` hace referencia al objeto actual. Dentro de la clase, se usa para acceder y asignar propiedades del objeto que se está creando o usando en ese momento.',
      },
      {
        type: 'tip',
        value:
          '💡 Si no defines un constructor, JavaScript usa uno vacío por defecto: `constructor() {}`',
      },
    ],
  },
  {
    id: 4,
    title: 'Métodos e Instancias',
    shortDescription: 'Define comportamientos en tus clases con métodos de instancia y estáticos.',
    icon: '⚡',
    accentColor: '#F59E0B',
    gradientColors: ['#F59E0B', '#D97706'],
    durationMinutes: 12,
    sections: [
      { type: 'heading', value: 'Métodos de Instancia' },
      {
        type: 'text',
        value:
          'Los métodos son funciones definidas dentro de una clase. Los métodos de instancia se llaman sobre un objeto creado con `new` y tienen acceso a `this`.',
      },
      {
        type: 'code',
        value: `class CuentaBancaria {
  constructor(titular, saldo = 0) {
    this.titular = titular;
    this.saldo = saldo;
    this.historial = [];
  }
  
  depositar(cantidad) {
    this.saldo += cantidad;
    this.historial.push(\`+$\${cantidad}\`);
    return this;  // permite encadenamiento
  }
  
  retirar(cantidad) {
    if (cantidad > this.saldo) {
      console.log('Saldo insuficiente');
      return this;
    }
    this.saldo -= cantidad;
    this.historial.push(\`-$\${cantidad}\`);
    return this;
  }
  
  verSaldo() {
    console.log(\`\${this.titular}: $\${this.saldo}\`);
    return this;
  }
}

const cuenta = new CuentaBancaria('María', 1000);

// Encadenamiento de métodos
cuenta
  .depositar(500)
  .retirar(200)
  .verSaldo(); // María: $1300`,
      },
      { type: 'heading', value: 'Métodos Estáticos' },
      {
        type: 'text',
        value:
          'Los métodos estáticos pertenecen a la clase, no a sus instancias. Se usan para utilidades o fábricas.',
      },
      {
        type: 'code',
        value: `class Temperatura {
  static celsiusAFahrenheit(c) {
    return c * 9/5 + 32;
  }
  
  static fahrenheitACelsius(f) {
    return (f - 32) * 5/9;
  }
}

// Se llaman directamente en la clase
console.log(Temperatura.celsiusAFahrenheit(100)); // 212
console.log(Temperatura.fahrenheitACelsius(32));  // 0`,
      },
      {
        type: 'tip',
        value:
          '💡 Retornar `this` desde un método permite el encadenamiento fluido: `obj.metodo1().metodo2().metodo3()`',
      },
    ],
  },
  {
    id: 5,
    title: 'Herencia',
    shortDescription: 'Reutiliza y extiende clases usando `extends` y `super` en JavaScript.',
    icon: '🧬',
    accentColor: '#EC4899',
    gradientColors: ['#EC4899', '#BE185D'],
    durationMinutes: 15,
    sections: [
      { type: 'heading', value: '¿Qué es la Herencia?' },
      {
        type: 'text',
        value:
          'La herencia permite crear una nueva clase basada en una existente. La clase hija hereda todas las propiedades y métodos de la clase padre, y puede agregar los suyos propios o sobrescribir los heredados.',
      },
      { type: 'heading', value: 'Clase base y clase hija' },
      {
        type: 'code',
        value: `// Clase padre (base)
class Vehiculo {
  constructor(marca, año) {
    this.marca = marca;
    this.año = año;
    this.encendido = false;
  }
  
  encender() {
    this.encendido = true;
    console.log(\`\${this.marca} encendido ✓\`);
  }
  
  info() {
    return \`\${this.marca} (\${this.año})\`;
  }
}

// Clase hija extiende Vehiculo
class Auto extends Vehiculo {
  constructor(marca, año, puertas) {
    super(marca, año); // llama al constructor padre
    this.puertas = puertas;
  }
  
  info() {
    // Sobrescribe el método padre
    return \`Auto: \${super.info()} - \${this.puertas} puertas\`;
  }
}

class Moto extends Vehiculo {
  constructor(marca, año, tipo) {
    super(marca, año);
    this.tipo = tipo;
  }
  
  info() {
    return \`Moto \${this.tipo}: \${super.info()}\`;
  }
}

const auto = new Auto('Toyota', 2023, 4);
const moto = new Moto('Honda', 2022, 'deportiva');

auto.encender();       // Toyota encendido ✓
console.log(auto.info());  // Auto: Toyota (2023) - 4 puertas
console.log(moto.info());  // Moto deportiva: Honda (2022)`,
      },
      { type: 'heading', value: '`super` — la clave' },
      {
        type: 'text',
        value:
          '• `super(args)` en el constructor → llama al constructor del padre\n• `super.metodo()` → llama al método del padre desde la subclase\n• Debes llamar `super()` antes de usar `this` en el constructor hijo',
      },
      {
        type: 'tip',
        value:
          '💡 Usa herencia cuando existe una relación "ES UN" — un Auto ES UN Vehículo. Evítala cuando solo necesitas compartir funciones (usa composición en su lugar).',
      },
    ],
  },
  {
    id: 6,
    title: 'Encapsulamiento',
    shortDescription: 'Protege el estado interno con campos privados, getters y setters.',
    icon: '🔒',
    accentColor: '#14B8A6',
    gradientColors: ['#14B8A6', '#0F766E'],
    durationMinutes: 12,
    sections: [
      { type: 'heading', value: '¿Qué es el Encapsulamiento?' },
      {
        type: 'text',
        value:
          'El encapsulamiento protege el estado interno de un objeto. Se controla qué datos son accesibles desde fuera y cuáles permanecen privados, y cómo se pueden modificar.',
      },
      { type: 'heading', value: 'Campos Privados con `#`' },
      {
        type: 'code',
        value: `class Billetera {
  #saldo = 0;        // campo privado
  #pin;              // campo privado
  
  constructor(saldoInicial, pin) {
    this.#saldo = saldoInicial;
    this.#pin = pin;
  }
  
  // Getter — solo lectura del saldo
  get saldo() {
    return this.#saldo;
  }
  
  // Método validado para retirar
  retirar(cantidad, pin) {
    if (pin !== this.#pin) {
      throw new Error('PIN incorrecto 🚫');
    }
    if (cantidad > this.#saldo) {
      throw new Error('Saldo insuficiente 💸');
    }
    this.#saldo -= cantidad;
    return \`Retiro de $\${cantidad} exitoso\`;
  }
  
  depositar(cantidad) {
    if (cantidad <= 0) throw new Error('Cantidad inválida');
    this.#saldo += cantidad;
  }
}

const billetera = new Billetera(500, 1234);

console.log(billetera.saldo);            // 500
billetera.depositar(200);
console.log(billetera.saldo);            // 700

billetera.retirar(100, 1234);            // ✓
// billetera.#saldo = 999999;            // ❌ Error: campo privado
// billetera.retirar(100, 9999);         // ❌ PIN incorrecto`,
      },
      { type: 'heading', value: 'Getters y Setters' },
      {
        type: 'code',
        value: `class Temperatura {
  #celsius;
  
  constructor(celsius) {
    this.#celsius = celsius;
  }
  
  get celsius() { return this.#celsius; }
  get fahrenheit() { return this.#celsius * 9/5 + 32; }
  get kelvin() { return this.#celsius + 273.15; }
  
  set celsius(valor) {
    if (valor < -273.15) throw new Error('Bajo cero absoluto');
    this.#celsius = valor;
  }
}

const temp = new Temperatura(100);
console.log(temp.fahrenheit); // 212
console.log(temp.kelvin);     // 373.15
temp.celsius = 0;
console.log(temp.fahrenheit); // 32`,
      },
      {
        type: 'tip',
        value:
          '💡 Los campos privados (`#`) son una característica moderna de JavaScript (ES2022). Usa `_propiedad` como convención si necesitas compatibilidad con entornos más antiguos.',
      },
    ],
  },
  {
    id: 7,
    title: 'Polimorfismo',
    shortDescription: 'Un mismo método con diferentes comportamientos según el objeto que lo ejecute.',
    icon: '🎭',
    accentColor: '#F97316',
    gradientColors: ['#F97316', '#EA580C'],
    durationMinutes: 14,
    sections: [
      { type: 'heading', value: '¿Qué es el Polimorfismo?' },
      {
        type: 'text',
        value:
          'Polimorfismo significa "muchas formas". En POO, permite que objetos de diferentes clases respondan al mismo mensaje (método) de manera distinta. El código que usa el objeto no necesita saber de qué tipo exacto es.',
      },
      { type: 'heading', value: 'Polimorfismo por herencia' },
      {
        type: 'code',
        value: `class Figura {
  area() {
    return 0;
  }
  
  toString() {
    return \`\${this.constructor.name}: área = \${this.area().toFixed(2)}\`;
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super();
    this.radio = radio;
  }
  
  area() {
    return Math.PI * this.radio ** 2;
  }
}

class Rectangulo extends Figura {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }
  
  area() {
    return this.base * this.altura;
  }
}

class Triangulo extends Figura {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }
  
  area() {
    return (this.base * this.altura) / 2;
  }
}

// Polimorfismo en acción
const figuras = [
  new Circulo(5),
  new Rectangulo(4, 6),
  new Triangulo(3, 8),
];

// La misma función trabaja con cualquier figura
figuras.forEach(figura => {
  console.log(figura.toString());
});
// Circulo: área = 78.54
// Rectangulo: área = 24.00
// Triangulo: área = 12.00`,
      },
      { type: 'heading', value: '¿Por qué es poderoso?' },
      {
        type: 'text',
        value:
          'El loop `forEach` llama al mismo método `toString()` en cada figura, pero cada una ejecuta su propia versión de `area()`. El código exterior no cambia, pero el comportamiento sí.',
      },
      {
        type: 'tip',
        value:
          '💡 El polimorfismo hace que tu código sea extensible: puedes agregar nuevas clases sin modificar el código que las usa.',
      },
    ],
  },
  {
    id: 8,
    title: 'Abstracción',
    shortDescription: 'Simplifica la complejidad exponiendo solo lo esencial con interfaces claras.',
    icon: '🎯',
    accentColor: '#6366F1',
    gradientColors: ['#6366F1', '#4338CA'],
    durationMinutes: 14,
    sections: [
      { type: 'heading', value: '¿Qué es la Abstracción?' },
      {
        type: 'text',
        value:
          'La abstracción consiste en ocultar los detalles complejos de implementación y exponer solo una interfaz simple y clara. Es como usar un control remoto: no necesitas saber cómo funciona internamente, solo qué botones presionar.',
      },
      { type: 'heading', value: 'Clase abstracta simulada' },
      {
        type: 'text',
        value:
          'JavaScript no tiene clases abstractas nativas como Java o C#, pero podemos simularlas lanzando errores cuando se intenta usar la clase base directamente:',
      },
      {
        type: 'code',
        value: `class BaseDeDatos {
  constructor() {
    if (new.target === BaseDeDatos) {
      throw new Error('No se puede instanciar BaseDeDatos directamente');
    }
  }
  
  // Métodos abstractos — deben ser implementados por subclases
  conectar() {
    throw new Error('Debes implementar conectar()');
  }
  
  guardar(datos) {
    throw new Error('Debes implementar guardar()');
  }
  
  // Método concreto — usa los métodos abstractos
  async iniciarYGuardar(datos) {
    await this.conectar();
    return this.guardar(datos);
  }
}

class MySQL extends BaseDeDatos {
  constructor(host, usuario) {
    super();
    this.host = host;
    this.usuario = usuario;
  }
  
  async conectar() {
    console.log(\`MySQL: conectando a \${this.host}...\`);
    // lógica real de conexión
  }
  
  guardar(datos) {
    console.log(\`MySQL: guardando en tabla...\`, datos);
    return { exitoso: true, motor: 'MySQL' };
  }
}

class MongoDB extends BaseDeDatos {
  conectar() {
    console.log('MongoDB: conectando a cluster...');
  }
  
  guardar(datos) {
    console.log('MongoDB: insertando documento...', datos);
    return { exitoso: true, motor: 'MongoDB' };
  }
}

// El código cliente no sabe qué base de datos es
function procesarPedido(db, pedido) {
  return db.iniciarYGuardar(pedido); // misma interfaz, diferente motor
}

const mysql = new MySQL('localhost', 'root');
const mongo = new MongoDB();

procesarPedido(mysql, { id: 1, producto: 'Laptop' });
procesarPedido(mongo, { id: 2, producto: 'Mouse' });`,
      },
      { type: 'heading', value: '¡Lo lograste! 🎉' },
      {
        type: 'text',
        value:
          'Has completado los 8 módulos de Programación Orientada a Objetos en JavaScript. Ahora conoces los 4 pilares: Encapsulamiento, Herencia, Polimorfismo y Abstracción, junto con clases, constructores y métodos.',
      },
      {
        type: 'tip',
        value:
          '🚀 El siguiente paso: practica combinando estos conceptos en proyectos reales. Crea un sistema de inventario, un videojuego, o una app usando POO pura.',
      },
    ],
  },
];
