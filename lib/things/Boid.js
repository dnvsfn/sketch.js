/** @class */
var Boid = Base.extend({
  init: function (config) {
    this.acceleration = new Point();
    this.velocity = new Point(random(-0.5,0.5), random(-0.5,0.5));
    this.location = config.location || new Point();
    this.radius = config.radius || 6.0;
    this.speed = config.speed || 3.0;
    this.force = config.force || 0.15;
    this.color = config.color || new Color();
    return this;
  },
  run: function (flock) {
    this.flock(flock);
    this.update();
    this.borders();
    this.draw();
  },
  flock: function (flock) {
    var sep = this.separate(flock),
      ali = this.align(flock),
      coh = this.cohesion(flock);

    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);

    this.acceleration.add(sep);
    this.acceleration.add(ali);
    this.acceleration.add(coh);
  },
  update: function () {
    // this.acceleration.add(new Point(Math.random()<0.5?-1:1, Math.random()<0.5?-1:1));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);
    this.location.add(this.velocity);
    this.angle = this.velocity.heading() + (Math.PI/2);
    this.acceleration = new Point();
  },
  seek: function (target) {
    this.acceleration.add(this.steer(target, false));
  },
  arrive: function (target) {
    this.acceleration.add(this.steer(target, true));
  },
  steer: function (target, slowdown) {
    var steer,
      desired = Point.sub(target, this.location),
      d = desired.mag();
  
    if (d > 0) {
      desired.normalize();
      if ((slowdown) && (d < 100.0)) {
        desired.mult(this.speed * (d/100.0));
      } else {
        desired.mult(this.speed);
      }
      steer = Point.sub(desired, this.velocity);
      steer.limit(this.force);
    } else {
      steer = new Point();
    }
    return steer;
  },
  draw: function () {
    stroke('black');
    push();
    move(this.location);
    // rotate(this.angle);
    move(-(this.radius/2), -(this.radius/2));
    rotate(this.angle);
    stroke(false);
    fill(this.color.toString());
    circle(0,0, this.radius);
    // fill('white');
    // rectangle(-2, -1, 4, this.radius);
    pop();
  },
  borders: function () {
    if (this.location.x < -this.radius) {
      this.location.x = $pad.width + this.radius;
    }
    if (this.location.y < -this.radius) {
      this.location.y = $pad.height + this.radius;
    }
    if (this.location.x > $pad.width + this.radius) {
      this.location.x = -this.radius;
    }
    if (this.location.y > $pad.height + this.radius) {
      this.location.y = -this.radius;
    }
  },
  separate: function (flock) {
    // var desiredseparation = 20.0,
    var desiredseparation = this.radius * 2,
      steer = new Point(),
      count = 0;

    for (var i=0; i < flock.length; i++) {
      var other = flock[i],
        d = Point.distance(this.location, other.location);
  
      if ((d > 0) && (d < desiredseparation)) {
        var diff = Point.sub(this.location, other.location);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    };

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.max_speed);
      steer.sub(this.velocity);
      steer.limit(this.max_force);
    }
    return steer;
  },
  align: function (flock) {
    // var neighbordist = 25.0,
    var neighbordist = this.radius * 2,
      steer = new Point(),
      count = 0;

    for (var i=0; i < flock.length; i++) {
      var other = flock[i],
        d = Point.distance(this.location, other.location);
  
      if ((d > 0) && (d < neighbordist)) {
        steer.add(other.velocity);
        count++;
      }
    };

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.max_speed);
      steer.sub(this.velocity);
      steer.limit(this.max_speed);
    }
    return steer;

  },
  cohesion: function (flock) {
    // var neighbordist = 25.0,
    var neighbordist = this.radius,
      sum = new Point(),
      count = 0;

    for (var i=0; i < flock.length; i++) {
      var other = flock[i],
        d = Point.distance(this.location, other.location);
  
      if ((d > 0) && (d < neighbordist)) {
        sum.add(other.location);
        count++;
      }
    };

    if (count > 0) {
      sum.div(count);
      return this.steer(sum, false);
    }
    return sum;
  }
});