export default class ReviewModel {
  constructor(
    revemail,
    paperid,
    techmerit,
    readability,
    originality,
    relavance,
    overallrecomm,
    commentforcommittee,
    commentforauthor,
  ) {
    this.revemail = revemail;
    this.paperid = paperid;
    this.techmerit = techmerit;
    this.readability = readability;
    this.originality = originality;
    this.relavance = relavance;
    this.overallrecomm = overallrecomm;
    this.commentforcommittee = commentforcommittee;
    this.commentforauthor = commentforauthor;
  }
}
