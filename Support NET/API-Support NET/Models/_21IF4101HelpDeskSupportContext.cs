using Microsoft.EntityFrameworkCore;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class _21IF4101HelpDeskSupportContext : DbContext
    {
        public _21IF4101HelpDeskSupportContext()
        {
        }

        public _21IF4101HelpDeskSupportContext(DbContextOptions<_21IF4101HelpDeskSupportContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Issue> Issue { get; set; }
        public virtual DbSet<Note> Note { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<Supervisor> Supervisor { get; set; }
        public virtual DbSet<Supporter> Supporter { get; set; }
        public virtual DbSet<SupporterService> SupporterService { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=163.178.107.10;Initial Catalog=21-IF4101-HelpDesk-Support;User ID=laboratorios;Password=KmZpo.2796");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>(entity =>
            {
                entity.HasKey(e => e.ReportNumber)
                    .HasName("PK__Issue__715DB6640599C0BB");

                entity.Property(e => e.ReportNumber)
                    .HasColumnName("Report_Number")
                    .ValueGeneratedNever();

                entity.Property(e => e.Classification)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Ingresada')");

                entity.Property(e => e.IdSupporter).HasColumnName("Id_Supporter");

                entity.Property(e => e.ReportTime)
                    .HasColumnName("Report_Time")
                    .HasColumnType("datetime");

                entity.Property(e => e.ResolutionComment)
                    .IsRequired()
                    .HasColumnName("Resolution_Comment")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Ingresado')");

                entity.HasOne(d => d.Supporter)
                    .WithMany(p => p.Issue)
                    .HasForeignKey(d => d.IdSupporter)
                    .HasConstraintName("FK__Issue__Id_Suppor__7A672E12");
            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.ReportNumberIssue })
                    .HasName("PK__Note__08F8DB24E2CD791D");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ReportNumberIssue).HasColumnName("Report_Number_Issue");

                entity.Property(e => e.Author)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NoteTime)
                    .HasColumnName("Note_Time")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Issue)
                    .WithMany(p => p.Note)
                    .HasForeignKey(d => d.ReportNumberIssue)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Note__Report_Num__7E37BEF6");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Supervisor>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Supervis__A9D10534486DDF91")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(320)
                    .IsUnicode(false);

                entity.Property(e => e.FirstSurname)
                    .IsRequired()
                    .HasColumnName("First_Surname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.SecondSurname)
                    .IsRequired()
                    .HasColumnName("Second_Surname")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Supporter>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Supporte__A9D105342D9A6160")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(320)
                    .IsUnicode(false);

                entity.Property(e => e.FirstSurname)
                    .IsRequired()
                    .HasColumnName("First_Surname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdSupervisor).HasColumnName("Id_Supervisor");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.SecondSurname)
                    .IsRequired()
                    .HasColumnName("Second_Surname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Supervisor)
                    .WithMany(p => p.Supporter)
                    .HasForeignKey(d => d.IdSupervisor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Supporter__Id_Su__73BA3083");
            });

            modelBuilder.Entity<SupporterService>(entity =>
            {
                entity.HasKey(e => new { e.IdSupporter, e.IdService })
                    .HasName("PK__Supporte__81A7B1143A655B9A");

                entity.ToTable("Supporter_Service");

                entity.Property(e => e.IdSupporter).HasColumnName("Id_Supporter");

                entity.Property(e => e.IdService).HasColumnName("Id_Service");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.SupporterService)
                    .HasForeignKey(d => d.IdService)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Supporter__Id_Se__03F0984C");

                entity.HasOne(d => d.Supporter)
                    .WithMany(p => p.SupporterService)
                    .HasForeignKey(d => d.IdSupporter)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Supporter__Id_Su__02FC7413");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
