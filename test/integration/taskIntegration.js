describe('Route Tasks', () => {
  const Tasks = app.models.task;

  const defaultTask = [
    {
      _id: '58718ea49d31ad1558bc8ff8',
      activity: 'study hard!',
      done: true,
    },
    {
      _id: '592df217f5f9df25ae0200c2',
      activity: 'Make a coffee!',
      done: true,
    },
  ];

  beforeEach(done => {
    Tasks.remove({}, () => Tasks.insertMany(defaultTask, done));
  });


  describe('POST /tasks', () => {
    describe('status 200', () => {
      it('creates a new task', (done) => {
        request.post('/api/tasks')
          .send({ activity: 'run fast!', done: false })
          .expect(200)
          .end((err, res) => {
            expect(res.body.activity).to.eql('run fast!');
            expect(res.body.done).to.eql(false);
            done(err);
          });
      });
    });
  });

  describe('GET /api/tasks', () => {
    describe('status 200', () => {
      it('should be get all task', (done) => {
        request
            .get('/api/tasks')
            .end((err, res) => {
              expect(res.body).to.be.instanceof(Array);
              done(err);
            });
      });
    });
  });


  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        request.get(`/api/tasks/${defaultTask[0]._id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).to.eql(defaultTask[0]._id);
            expect(res.body.activity).to.eql(defaultTask[0].activity);
            expect(res.body.done).to.eql(defaultTask[0].done);
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', done => {
        request.get('/tasks/id-not-exist')
          .expect(404)
          .end(err => done(err));
      });
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', (done) => {
        request.delete(`/api/tasks/${ defaultTask[1]._id }`)
          .expect(200)
          .end(err => done(err));
      });
    });
  });



});
