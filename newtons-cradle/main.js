function NewtonsCradle(canvasWidth, canvasID, ballCount) {

  var Engine = Matter.Engine, World = Matter.World, Body = Matter.Body,
      Bodies = Matter.Bodies, Constraint = Matter.Constraint, Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint;

  var BALL_COUNT = ballCount;
  var CANVAS_WIDTH = canvasWidth;
  var CANVAS_HEIGHT = CANVAS_WIDTH/3;
  var SPRITE_SIZE = 240;
  var SPRITE_NAME = 'ball.png';

  var engine = Engine.create(document.body, {
    timing: { timeScale: 1.25 },
    render: {
      canvas: document.getElementById(canvasID),
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        showAngleIndicator: false,
        wireframes: false
      }
    }
  });

  var mouseConstraint = MouseConstraint.create(engine);
  World.add(engine.world, mouseConstraint);

  var BALL_RADIUS = (( ( CANVAS_WIDTH/BALL_COUNT ) / 2 )*0.5);
  var BALL_DIAMETER = 2*BALL_RADIUS;
  var BALL_SPRITE_SCALE = BALL_DIAMETER / SPRITE_SIZE;
  var BallPositions = {
    x: ( ( CANVAS_WIDTH - ( BALL_DIAMETER * BALL_COUNT ) ) / 2 ),
    y: (CANVAS_HEIGHT*0.75)
  };

  var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });
  var ball, ballString;
  for (var i = 0; i < BALL_COUNT; i++) {
    var separation = 1.9,
    ball = Bodies.circle(
      (BallPositions.x + i * (BALL_RADIUS * separation)), BallPositions.y, BALL_RADIUS,
      { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop:1 }
    );
    console.log((BallPositions.x + i * (BALL_DIAMETER + separation)))
    ball.render.sprite.xScale = ball.render.sprite.yScale = BALL_SPRITE_SCALE;
    ball.render.sprite.texture = SPRITE_NAME;
    ballString = Constraint.create({
      pointA: { x:(BallPositions.x + i * (BALL_RADIUS * separation)), y:0 },
      bodyB: ball,
      pointB: { x:0, y:0 }
    });

    Composite.addBody(newtonsCradle, ball);
    Composite.addConstraint(newtonsCradle, ballString);
  }

  World.add(engine.world, newtonsCradle);
  Body.translate(newtonsCradle.bodies[0], { x: -BALL_DIAMETER*3, y: -BALL_DIAMETER*2 });
  Engine.run(engine);
}

//instantiate the class, with canvas width, the id of the canvas (no selector!) and ball count
NewtonsCradle(800, 'rend', 5);